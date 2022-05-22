const { defaultPrefix } = require('../../settings.json');
const group = require('../../../Structures/Database/schemas/group');

module.exports = {
  name: 'prefix',
  aliases: ['prefixo'],
  permissions: ['USER'],
  args: true,
  usage: 'set <prefix>',
  example: 'set s!', 
  description: {
    en: 'change the prefix to the group',
    pt: 'altera o prefixo para o grupo'
  },
  async run(client, message, args) {

   const { lang } = client;

   let data = await group.findOne({ _id: message.from });
   const options  = [data.prefix ?? defaultPrefix, this.name, this.usage];

   if (!args[1]) return client.reply(message.from, lang.invArgs(options), message.id);
   if (args[0].toLowerCase() !== 'set') return client.reply(message.from, lang.invArgs(options), message.id);
   if (args[1].length > 4) return client.reply(message.from, lang.prefixRange, message.id); 

   data = await group.findOneAndUpdate(
     { _id: message.from },
     {  prefix: args[1]  },
     { new: true, upsert: true }
   );

   client.reply(message.from, lang.prefixChanged(data.prefix), message.id);
  }
};
