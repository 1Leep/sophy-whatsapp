const { onlyGroup } = require('../../Structures/Langs/en');
const { defaultPrefix, ownerId } = require('../settings.json');
const group = require('../../Structures/Database/schemas/group.js');
const user = require('../../Structures/Database/schemas/user.js');
const register = require('../models/create.js');
const levels = require('../../Structures/levels.js');

module.exports = {
  name: 'onMessage',
  async run(message, client) {

    if (!message.isGroupMsg) {
      client.reply(message.from, onlyGroup, message.id);
      return;
    }

    let groupData = await group.findOne({ _id: message.from });
    let userData = await user.findOne({ _id: message.author });
    if (!groupData) groupData = await register('group', message.from);

    if (!userData) {
      userData = await register('user', message.author);
      await register('profile', message.author);
      await register('background', message.author);
    }
    
    const prefix = groupData.prefix ?? defaultPrefix;
    client.lang = require(`../../Structures/Langs/${groupData.lang || 'en'}`);

    if (message.body.toLowerCase() === `@${client.id.replace('@c.us', '')}`) {
      client.reply(message.from, client.lang.mentionMe(prefix), message.id);
    }

    client.cooldown.has(message.from) || client.cooldown.set(message.from, new Map());
    const xpCooldownCount = 20 * 1000; 
    const groupCooldown = client.cooldown.get(message.from);
    const memberXpCooldown = groupCooldown.get(`xp_${message.author}`);
    const xpTimeLeft = xpCooldownCount - (Date.now() - memberXpCooldown);
    userData = await user.findOne({ _id: message.author });
   
    if (!memberXpCooldown || (memberXpCooldown && xpTimeLeft <= 0)) {
      if (userData.xp + 1 === levels[userData.level + 1].required) {
        userData.xp = userData.xp + 1;
        userData.level = userData.level + 1;
        await client.reply(message.from, client.lang.levelUp(userData.level, levels[userData.level].name), message.id);
      } else {
        userData.xp = userData.xp + 1;
      }
      await userData.save();
      groupCooldown.set(`xp_${message.author}`, Date.now());
    }

    if (!message.body || !message.body.startsWith(prefix)) return;
    if (userData.blacklist) {
      await client.reply(message.from, client.lang.blacklist, message.id);
      return;
    }
    const args = message.body.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName) ||
      client.aliases.get(commandName);

    if (!command) return;

    if (command.permissions) {
      const { permissions } = command;
      const admins = await client.getGroupAdmins(message.from);

      if (permissions.includes('BOT') && !admins.includes(client.id)) {
        client.reply(message.from, client.lang.noPermBot, message.id);
        return;
      }

      if (permissions.includes('USER') && !admins.includes(message.author)) {
        client.reply(message.from, client.lang.noPermUser, message.id);
        return;
      }

      if (permissions.includes('DEV') && message.author !== ownerId) {
        client.reply(message.from, client.lang.noPermDev, message.id);
        return;
      }
    }


    if (command.args && !args.length) {
      const options = [prefix, command.name, command.usage];
      client.reply(message.from, client.lang.invArgs(options), message.id);
      return;
    }

    if (command.quoted && !message.quotedMsg) {
      client.reply(message.from, client.lang.mentionMedia, message.id);
      return;
    }

    const memberCooldown = groupCooldown.get(`${command.name}_${message.author}`);

    if (command.cooldown && memberCooldown) {
      const cooldown = command.cooldown * 1000;
      const timeElapsed = Date.now() - memberCooldown;
      const timeLeft = cooldown - timeElapsed;
      const timeRemaining = Array.from(new Date(timeLeft).toLocaleTimeString('pt-br').split(':'), Number);

      if (timeLeft > 0) {
        client.reply(message.from, client.lang.remaining(timeRemaining), message.id);
        return;
      }
    }

    try {
      command.run(client, message, args);
    } catch (err) {
      client.reply(message.from, client.lang.commandErr, message.id);
      console.error(err);
    }

  }
};
