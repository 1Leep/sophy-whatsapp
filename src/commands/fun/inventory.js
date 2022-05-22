const user = require('../../../Structures/Database/schemas/user.js');

module.exports = {
  name: 'inventory', 
  aliases: ['inventario'], 
  cooldown: 5,
  usage: '', 
  example: '', 
  description: {
    en: 'Shows inventory items',
    pt: 'Mostra os itens do inventário'
  }, 
  async run(client, message, args) {
    const { name } = client.lang;
    const userData = await user.findOne({ _id: message.author });
 
    const format = string => `\`\`\`${string}\`\`\``;
    const empty = name === 'en' ? 'empty' : 'vazio';
    
    const title = name === 'en' ? format('INVENTORY') : format('INVENTÁRIO');
    const author = name === 'en' ? 'Name' : 'Nome';
    const header = `╔═══════◄••❀••►═══════\n║ ${title}\n║ *${author}: ${message.sender.pushname}*\n╚═══════◄••❀••►═══════`;
   
    const template = item => `┏━━━━━ • ஜ • ❈ • ஜ • ━━━━━┓\n┃• ${format(item.name[name])}\n┃• ${name === 'en' ?  'Count:' : 'Quant:'} ${format(item.count)}\n┗━━━━━ • ஜ • ❈ • ஜ • ━━━━━┛\n`;
    const items = userData.inventory.length ? userData.inventory.map(i => template(i)).join('\n') : format(empty); 
    const inventoryMsg = `${header}\n\n${items}`;
    
    await client.reply(message.from, inventoryMsg, message.id);
    
  }
};
