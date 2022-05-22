const { readdirSync } = require('fs');
const { defaultPrefix } = require('../../settings.json');
const group = require('../../../Structures/Database/schemas/group');
const uptime = require('../../utils/uptime.js');

module.exports = {
  name: 'help', 
  aliases: ['menu'], 
  args: false, 
  usage: '<command>', 
  example: 'lock', 
  description: {
    en: 'show the command list.',
    pt: 'mostra a lista de comandos.'
  }, 
  async run(client, message, args) {
    
    const data = await group.findOne({ _id: message.from });
    if (!data) return;
    
    const { helpFooter, notFound, commandInfo } = client.lang;
    
    const commandPath = './src/commands/';
    const mods = getCommands(commandPath + 'moderation'),
          utils = getCommands(commandPath + 'utils'), 
          settings = getCommands(commandPath + 'settings'), 
          fun = getCommands(commandPath + 'fun'), 
          games = getCommands(commandPath + 'games');
   
    const ramUsage =  (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + '%';
    const commandList = `♡･ﾟ:*｡.:*･ﾟち口ㄗ卄ㄚﾟ･*:.｡*:ﾟ･♡
    
✿❯──────「✿」──────❮✿
✿ ${data.lang === 'en' ? 'Name:' : 'Nome:'} *Sophy ぞ*
✿ ${data.lang === 'en' ?  'RAM Usage:' : 'Uso da RAM:'} *${ramUsage}*
✿ ${data.lang === 'en' ? 'Programming lang:' : 'Linguagem:'} *JavaScript*
✿ OS: *${process.platform.toUpperCase()} ${process.arch}*
✿ *${uptime(data.lang)}*
✿❯──────「✿」──────❮✿

*╔════════❖•ೋ° °ೋ•❖════════╗*
*║〘📓〙${data.lang === 'en' ? 'UTILS' : 'UTILITÁRIOS'} ♔*
${showCommands(utils)}
*╚════════❖•ೋ° °ೋ•❖════════╝* 

*╔════════❖•ೋ° °ೋ•❖════════╗*
*║〘🎴〙${data.lang === 'en' ? 'MODERATION' : 'MODERAÇÃO'} ♔*
${showCommands(mods)}
*╚════════❖•ೋ° °ೋ•❖════════╝* 

*╔════════❖•ೋ° °ೋ•❖════════╗*
*║〘🛠️〙${data.lang === 'en' ? 'SETTINGS' : 'CONFIGURAÇÃO'} ♔*
${showCommands(settings)}
*╚════════❖•ೋ° °ೋ•❖════════╝* 

*╔════════❖•ೋ° °ೋ•❖════════╗*
*║〘🧩〙${data.lang === 'en' ? 'FUN' : 'DIVERSÃO'} ♔*
${showCommands(fun)}
*╚════════❖•ೋ° °ೋ•❖════════╝* 

*╔════════❖•ೋ° °ೋ•❖════════╗*
*║〘🎮〙${data.lang === 'en' ? 'GAMES' : 'JOGOS'} ♔*
${showCommands(games)}
*╚════════❖•ೋ° °ೋ•❖════════╝* 

${helpFooter(data.prefix ?? defaultPrefix)} 
`
    
    if (!args.length) {
      client.reply(message.from, commandList, message.id);
      return;
    } 
    
    const commandName = args[0].toLowerCase();
    const command = client.commands.get(commandName) || client.aliases.get(commandName);
    
    if (!command) return client.reply(message.from, notFound, message.id);
    
    const options = [
      command.name, 
      command.usage,
      command.example,
      command.aliases,
      command.description[data.lang] 
      ];
    
    await client.reply(message.from, commandInfo(data.prefix ?? defaultPrefix, options), message.id);
    
  } 
}
  
  function getCommands(path) {
    const files = readdirSync(path).filter(file => file.endsWith('.js'));
    const fileNames = files.map(file => `${file.replace('.js', '')}`);
    return fileNames;
  }
  
  function showCommands(cmd) {
    return cmd.map(i => `*║ ➽ ${i}*`).join('\n');
   }
