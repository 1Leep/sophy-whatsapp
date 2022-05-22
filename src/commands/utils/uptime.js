const uptime = require('../../utils/uptime.js');

module.exports = {
  name: 'uptime',
  aliases: ['tempoativo'],
  cooldown: 5,
  usage: '',
  example: '',
  description: {
    en: 'shows bot activity time',
    pt: 'mostra o tempo de atividade do bot'
  },
  async run(client, message, args) {
    
    const { lang } = client;
    await client.reply(message.from, uptime(lang.name), message.id);
  }
};