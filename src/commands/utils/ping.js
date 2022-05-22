module.exports = {
  name: 'ping',
  aliases: ['ms'],
  args: false,
  cooldown: 3,
  usage: '',
  example: '',
  description: {
    en: 'show the latency',
    pt: 'mostra a latência'
  },
  async run(client, message, args) {
    const { pingMsg } = client.lang;
    const startTimestamp = Date.now();

    await client.sendText(message.from, pingMsg[0]);
    const endTimestamp = Date.now();
    const pingValue = endTimestamp - startTimestamp;

    client.sendText(message.from, pingMsg[1].replace('{ping}', pingValue));

  }
};
