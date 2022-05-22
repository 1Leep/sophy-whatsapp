const user = require('../../../Structures/Database/schemas/user.js');
const profilePic = require('../../../Structures/Database/schemas/profilePic.js');
const backgroundImg = require('../../../Structures/Database/schemas/backgroundImg.js');
const levels = require('../../../Structures/levels.js');
const Rank = require('../../utils/rank.js');
const { decryptMedia } = require('@open-wa/wa-automate');
const fs = require('fs/promises');
const { CanvasSenpai } = require('canvas-senpai');
const canva = new CanvasSenpai();

module.exports = {
  name: 'profile',
  aliases: ['perfil'],
  args: true,
  cooldown: 5,
  usage: '*view | set | remove*',
  example: 'view',
  description: {
    en: 'view your profile, change or remove the avatar',
    pt: 'vê seu perfil, altera ou remove seu avatar'
  },
  async run(client, message, args) {
    const { commandErr, mentionMedia, invalidQuoted, invUser, sucessChanges, profileStats } = client.lang;
    const choose = args[0].toLowerCase();

    try {

      if (choose === 'set') {
        const mediaFile = message.quotedMsg;

        if (!mediaFile) {
          client.reply(message.from, mentionMedia, message.id);
          return;
        }

        if (mediaFile.type !== 'image') {
          client.reply(message.from, invalidQuoted, message.id);
          return;
        }
        
        const msgTarget = await client.getMessageById(mediaFile.id);
        const imageBuffer = await decryptMedia(msgTarget);

        const dataUser = await user.findOneAndUpdate({ _id: message.author }, {
          customPfp: true,
          profilePic: `./src/media/profile/${message.author.replace('@c.us','')}.jpg`
        }, { new: true, upsert: true });

        const dataProfilePic = await profilePic.findOneAndUpdate({ _id: message.author }, {
          buffer: imageBuffer
        }, { new: true, upsert: true });

        await client.reply(message.from, sucessChanges, message.id);
      }


      if (choose === 'remove') {
        const dataUser = await user.findOneAndUpdate({ _id: message.author }, {
          customPfp: false,
          profilePic: `./src/media/profile/default.jpg`
        }, { new: true, upsert: true });
        await client.reply(message.from, sucessChanges, message.id);
      }


      if (choose === 'view') {
        const target = message.author;
        const dataUser = await user.findOne({ _id: target });
        const dataProfilePic = await profilePic.findOne({ _id: target });
        const dataBackgroundImg = await backgroundImg.findOne({ _id: target });
        const path = type => `./src/media/${type}/${target.replace('@c.us', '')}.jpg`;

        if (dataUser.customPfp) {
          await fs.writeFile(path('profile'), dataProfilePic.buffer);
        }

        const optionsRank = {
          gradiant: dataUser.backgroundTheme,
          name: message.sender.pushname ?? 'Invalid Name...',
          discriminator: levels[dataUser.level].name,
          level: String(dataUser.level),
          rank: await Rank.showPosition('@' + message.author.replace('@c.us', '')),
          currentXP: String(dataUser.xp),
          fullXP: levels[dataUser.level + 1].required,
          avatar: dataUser.profilePic
        };

        if (dataUser.customBg) {
          await fs.writeFile(path('background'), dataBackgroundImg.buffer);
          optionsRank.link = dataUser.backgroundTheme;
          optionsRank.gradiant = null;
        }

        const rank = await canva.rankcard(optionsRank);
        const base64 = Buffer.from(rank).toString('base64');
        const imgToSend = `data:image/png;base64,${base64}`;
        const msgOptions = {
          xp: dataUser.xp,
          level: `${dataUser.level}.[${levels[dataUser.level].name}]`,
          nextLevel: `${dataUser.level + 1}.[${levels[dataUser.level + 1].name}]`,
          money: dataUser.money.toLocaleString('pt-br', { style: 'currency', currency:'BRL'})
        };
        await client.sendImage(message.from, imgToSend, 'img.png', profileStats(msgOptions), message.id);
      }
      
    } catch (err) {
      client.reply(message.from, commandErr, message.id);
      console.error(err);
    }
    
  }
};
