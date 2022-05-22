const ytdl = require('ytdl-core');
const search = require('yt-search');
const fs = require('fs');

module.exports = {
  name: 'play',
  aliases: ['download', 'baixar'],
  args: true,
  cooldown: 5,
  usage: '<name>',
  example: 'Garota de Ipanema',
  description: {
    en: 'Download a YouTube media',
    pt: 'Baixa uma mídia do YouTube'
  },
  async run(client, message, args) {
    const { name, loading, commandErr, rangeYtVideo, invalidUrl } = client.lang;
    const chosen = args.join(' ');
    await client.reply(message.from, loading, message.id);

    const {
      url,
      title,
      image,
      timestamp,
      seconds, 
      views,
      author, 
      type
    } = (await search(chosen)).all[0];

    const fileName = message.t;
    const path = `./src/media/audio/${fileName}.mp3`;

    const minCount = ~~(seconds / 60);
    if (minCount > 10) {
      client.reply(message.from, rangeYtVideo, message.id);
      return;
    }
    
    if (type !== 'video') {
      client.reply(message.from, invalidUrl, message.id);
      return;
    }

    const formatNumb = numb => numb.toLocaleString('pt-br');
    const duration = name === 'pt' ? `Duração: ${timestamp}` : `Duration: ${timestamp}`;
    const viewsCount = name === 'pt' ? `Visualizações: ${formatNumb(views)}` : `Views: ${formatNumb(views)}`;
    const channel = {
      link: name === 'pt' ? `Link Canal: ${author.url}` : `Channel Link: ${author.url}`,
      name: name === 'pt' ? `Canal: ${author.name}` : `Channel: ${author.name}`
    };
    const contentMsg = `*${title}*\n*${url}*\n*${duration}*\n*${viewsCount}*\n*${channel.name}*\n*${channel.link}*`;
    const stream = await ytdl(url, { filter: 'audioonly' });
    stream.pipe(fs.createWriteStream(path));
    
    stream.on('finish', async () => {
      try {
        await client.sendFileFromUrl(message.from, image, 'img.jpg', contentMsg, message.id);
        await client.sendPtt(message.from, path, message.id);
        await fs.promises.unlink(path);
      } catch (err) {
        client.reply(message.from, commandErr, message.id);
        console.error(err);
      }
    });

  }
};
