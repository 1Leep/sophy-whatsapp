const { readdirSync } = require('fs');
const { botId } = require('./settings.json');

const start = (client) => {

  const eventFiles = readdirSync('./src/events').filter(ev => ev.endsWith('.js'));
  const commandFolders = readdirSync('./src/commands');

  client.commands = new Map();
  client.aliases = new Map();
  client.cooldown = new Map();
  client.id = botId;

  eventFiles.forEach(ev => {
    const event = require(`./events/${ev}`);
    client[event.name]((...args) => event.run(...args, client));
  });

  commandFolders.forEach(folder => {
    const commandFiles = readdirSync(`./src/commands/${folder}`)
        .filter(cmd => cmd.endsWith('.js'));

    commandFiles.forEach(cmdName => {
      const command = require(`./commands/${folder}/${cmdName}`);
      if (command.aliases) {
         command.aliases
           .forEach(alias => client.aliases.set(alias, command));
      }
      client.commands.set(command.name, command);
    });
  });

}

module.exports = start;
