const backgroundColors = require('../../models/backgroundColors.js');
const user = require('../../../Structures/Database/schemas/user.js');
const backgroundImg = require('../../../Structures/Database/schemas/backgroundImg.js');
const { decryptMedia } = require('@open-wa/wa-automate');

module.exports = {
  name: 'background',
  aliases: ['fundo'],
  args: true,
  cooldown: 5,
  usage: '*color | set | remove*',
  example: 'color peakblue',
  description: {
    en: 'changes color, removes, or changes background imagd from profile',
    pt: 'altera a cor, remove, ou altera a imagem de fundo do perfil'
  },
  async run(client, message, args) {
    const { invBackgroundColor, insufficientLvl, commandErr, sucessChanges, mentionMedia, invalidQuoted } = client.lang;

    try {
      const choose = args[0].toLowerCase();
      const dataUser = await user.findOne({ _id: message.author });

      if (choose === 'color') {
        const colorChoose = args[1]?.toLowerCase();

        if (!backgroundColors.all.includes(colorChoose) || !colorChoose) {
          client.reply(message.from, invBackgroundColor(backgroundColors.all, backgroundColors.levelRequires), message.id);
          return;
        }
        if (backgroundColors.levelRequires.includes(colorChoose) && dataUser.level < 2) {
          client.reply(message.from, insufficientLvl(2), message.id);
          return;
        }
        dataUser.backgroundTheme = colorChoose;
        dataUser.customBg = false;
        await dataUser.save();
        await client.reply(message.from, sucessChanges, message.id);
      }

      if (choose === 'remove') {
        dataUser.customBg = false;
        dataUser.backgroundTheme = 'darkness';
        await dataUser.save();
        await client.reply(message.from, sucessChanges, message.id);
      }

      if (choose === 'set') {
        if (dataUser.level < 3) {
          client.reply(message.from, insufficientLvl(3), message.id);
          return;
        }

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
        await user.findOneAndUpdate({ _id: message.author }, {
          customBg: true,
          backgroundTheme: `./src/media/background/${message.author.replace('@c.us','')}.jpg`
        }, { new: true, upsert: true });

        await backgroundImg.findOneAndUpdate({ _id: message.author }, {
          buffer: imageBuffer
        }, { new: true, upsert: true });

        await client.reply(message.from, sucessChanges, message.id);
      }


    } catch (err) {
      client.reply(message.from, commandErr, message.id);
      console.error(err);
    }

  }
};
