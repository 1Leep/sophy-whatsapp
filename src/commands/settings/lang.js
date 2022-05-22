const group = require('../../../Structures/Database/schemas/group');
const { defaultPrefix } = require('../../settings.json');

module.exports = {
  name: 'lang',
  aliases: ['locale', 'idioma'],
  permissions: ['USER'],
  args: true,
  usage: 'set <lang> [pt, en]',
  example: 'set pt', 
  description: {
    en: 'change the language in the group',
    pt: 'altera o idioma no grupo'
  },
  async run(client, message, args) {

   const { lang } = client;
   let data = await group.findOne({ _id: message.from });
   const options = [data.prefix ?? defaultPrefix, this.name, this.usage];

   if (!args[1]) return client.reply(message.from, lang.invArgs(options), message.id);
   if (args[0].toLowerCase() !== 'set') return client.reply(message.from, lang.invArgs(options), message.id);
   if (!['pt', 'en'].includes(args[1].toLowerCase())) return client.reply(message.from, lang.invArgs(options), message.id);

   const choose = args[1].toLowerCase();

   data = await group.findOneAndUpdate(
     { _id: message.from },
     { lang: choose },
     { new: true, upsert: true }
   );

   const { langChanged } = require(`../../../Structures/Langs/${data.lang}`);
   client.reply(message.from, langChanged, message.id);
  }
};
