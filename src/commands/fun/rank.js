const Rank = require('../../utils/rank.js');

module.exports = {
  name: 'rank',
  aliases: ['podio'],
  cooldown: 5,
  usage: '',
  example: '',
  description: {
    en: 'Shows the global xp ranking',
    pt: 'Mostra o ranking de xp global'
  },
  async run(client, message, args) {
    const { commandErr } = client.lang;
    try {

      const msg = `●❯────────────────❮●
*..｡o○☆🅁🄰🄽🄺🄸🄽🄶☆○o｡..*
●❯────────────────❮●

┍──━─━──┙◆┕──━─━──┑
${await Rank.showRank()} 
┕──━─━──┑◆┍──━─━──┙
`
      await client.reply(message.from, msg, message.id);
    } catch (err) {
      client.reply(message.from, commandErr, message.id);
      console.error(err);
    }
  }
};
