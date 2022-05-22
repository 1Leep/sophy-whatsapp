const Gtts = require('gtts');
const { promisify } = require('util');
const unlink = promisify(require('fs').unlink);

module.exports = {
  name: 'say',
  aliases: ['falar'],
  args: true,
  cooldown: 5, 
  usage: '<text>',
  example: 'Hello world',
  description: {
    en: 'speaks the text the user has typed',
    pt: 'fala o texto que o usuário digitou'
  },
  async run(client, message, args) {
    const { name, commandErr } = client.lang;
    const gtts = new Gtts(args.join(' '), name);
    const filePath = `./tmp/${message.t}.mp3`;

    try {
      await save(gtts, filePath);
      await client.sendPtt(message.from, filePath, message.id);
      await unlink(filePath);

      client.cooldown.get(message.from)
        .set(`${this.name}_${message.author}`, Date.now());

    } catch (err) {
      client.reply(message.from, commandErr, message.id);
      console.error(err);
    }

  }
}

function save(gtts, path) {
  return new Promise((res, rej) => {
    gtts.save(path, err => {
      if (err) return rej(err);
      res();
    });
  });
}
