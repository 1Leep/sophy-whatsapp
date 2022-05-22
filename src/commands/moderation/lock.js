module.exports = {
  name: 'lock', 
  aliases: ['trancar'], 
  permissions: ['USER', 'BOT'], 
  args: false, 
  usage: '', 
  example: '', 
  description: {
    en: 'lock the group to admins.',
    pt: 'tranca o grupo para administradores.'
  }, 
  async run(client, message, args) {
    
    const { commandErr } = client.lang;
    
    try {
      await client.setGroupToAdminsOnly(message.from, true);
    } catch (err) {
      client.reply(message.from, commandErr, message.id);
      console.error(err);
    }
    
  }
}
