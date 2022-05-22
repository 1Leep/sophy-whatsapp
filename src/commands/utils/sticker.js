const { decryptMedia } = require('@open-wa/wa-automate');

module.exports = {
  name: 'sticker',
  aliases: ['figurinha'],
  quoted: true,
  usage: '<media>',
  example: '<img / video / gif>',
  description: {
    en: 'make a sticker from media.',
    pt: 'cria uma figurinha a partir de mídia.'
  },
  async run(client, message, args) {

    const { invalidQuoted, mediaRange, commandErr } = client.lang;
    const { quotedMsg } = message;

    if (!['image', 'video'].includes(quotedMsg.type)) {
      client.reply(message.from, invalidQuoted, message.id);
      return;
    }

    try {
      const mediaData = await decryptMedia(quotedMsg);
      const imgBase = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`;

      const options = { author: 'Sophy™', keepScale: true, pack: '[BOT]' };
      const videoOptions = { endTime: '00:00:10.0' };

      if (quotedMsg.type === 'image') {
        await client.sendImageAsSticker(message.from, imgBase, options);
      } else {
        const videoSticker = await client.sendMp4AsSticker(message.from, imgBase, videoOptions, options).catch(() => null);
        if (!videoSticker) return client.reply(message.from, mediaRange, message.id);
      }
    } catch (err) {
      client.reply(message.from, commandErr, message.id);
      console.error(err);
    }

  }
};
