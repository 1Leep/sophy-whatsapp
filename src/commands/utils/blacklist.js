const user = require('../../../Structures/Database/schemas/user.js');

module.exports = {
  name: 'blacklist',
  aliases: [],
  permissions: ['DEV'],
  args: true,
  usage: '<userID>',
  example: '557599400589@c.us',
  description: {
    en: 'add a user to blacklist',
    pt: 'adiciona um usuário na lista negra'
  },
  async run(client, message, args) {

    const userData = await user.findOne({ _id: args[0] });
    if (!userData) {
      await client.reply(message.from, client.lang.invUser, message.id);
      return;
    }
    
    if (userData.blacklist) {
      userData.blacklist = false;
    } else {
      userData.blacklist = true;
    }

    await userData.save();
    await client.reply(message.from, client.lang.sucessChanges + '\n' + userData.blacklist, message.id);
  }
};
