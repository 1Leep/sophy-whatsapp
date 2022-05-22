const { inspect } = require('util');

module.exports = {
  name: 'eval',
  aliases: ['ev'],
  permissions: ['DEV'],
  args: true,
  usage: '<script>',
  example: 'console.log(\'Sophy\');', 
  description: {
    en: 'run scripts through the bot',
    pt: 'roda scripts através do bot'
  },
  async run(client, message, args) {

   const format = str => `\`\`\`${str}\`\`\``;

   try {
     const evaled = eval(args.join(' '));
     const output = format(inspect(evaled, { depth: 0 }));
     await client.reply(message.from, output, message.id);
   } catch(err) {
     client.reply(message.from, format(`${err}`), message.id);
   }

  }
};
