module.exports = {
  name: 'react',
  aliases: ['reagir'],
  args: true,
  cooldown: 10,
  quoted: true,
  usage: '<emoji>',
  example: '💛',
  description: {
    en: 'reacts to a message with emoji',
    pt: 'reage a uma mensagem com emoji'
  },
  async run(client, message, args) {
    const { commandErr } = client.lang;
    try {
      const { quotedMsg } = message;
      await client.react(quotedMsg.id, args[0]);
    } catch (err) {
      client.reply(message.from, commandErr, message.id);
      console.error(err);
    }

  }
};
