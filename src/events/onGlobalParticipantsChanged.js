const group = require('../../Structures/Database/schemas/group.js');

module.exports = {
  name: 'onGlobalParticipantsChanged',
  async run(member, client) {

    const data = await group.findOne({ _id: member.chat });
    const { welcomeMsg, removedMsg } = require(`../../Structures/Langs/${data.lang}`);
    const number = member.who.replace('@c.us', '');

    if (data.welcome) {
      if (member.action === 'add') {
        await client.sendTextWithMentions(member.chat, welcomeMsg(number));
      }

      if (member.action === 'remove') {
        await client.sendTextWithMentions(member.chat, removedMsg(number));
      }
    }
    
  }
};