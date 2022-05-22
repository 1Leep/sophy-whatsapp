module.exports = {
  name: 'unlock', 
  aliases: ['destrancar'], 
  permissions: ['USER', 'BOT'], 
  args: false, 
  usage: '', 
  example: '', 
  description: {
    en: 'unlock the group to all members.',
    pt: 'destranca o grupo para todos os membros.'
  }, 
  async run(client, message, args) {
    
    const { commandErr } = client.lang;
    
    try {
      await client.setGroupToAdminsOnly(message.from, false);
    } catch (err) {
      client.reply(message.from, commandErr, message.id);
      console.error(err);
    }
    
  }
}
