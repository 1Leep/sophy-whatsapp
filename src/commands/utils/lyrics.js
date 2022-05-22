const fetch = require('node-fetch');

module.exports = {
  name: 'lyrics', 
  aliases: ['letra'], 
  args: true, 
  usage: '<name>', 
  example: 'industry baby', 
  description: {
    en: 'show the lyrics of the desired song.',
    pt: 'mostra as letras da música desejada.'
  }, 
  async run(client, message, args) {
    const { commandErr, lyricsNotFd } = client.lang;
    const songName = args.join(' ');
    const url = `https://some-random-api.ml/lyrics?title=${encodeURIComponent(songName)}`;
    
    try { 
      const request = await fetch(url);
      const data = await request.json();
      const { error, title, author, lyrics, thumbnail }  = data;
    
      if (error) return client.reply(message.from, lyricsNotFd, message.id);
    
      const textMsg = `\`\`\`${title} - ${author}\`\`\`\n\n${lyrics}`;
      await client.sendFileFromUrl(message.from, thumbnail.genius, 'thumb.jpg', textMsg, message.id);
    } catch (err) {
      client.reply(message.from, commandErr, message.id);
      console.error(err);
    }
    
  } 
} 
