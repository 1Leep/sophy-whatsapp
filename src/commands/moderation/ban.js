module.exports = {
  name: 'ban',
  aliases: ['banir', 'kick'],
  permissions: ['USER', 'BOT'],
  args: true,
  cooldown: 5,
  usage: '<member>',
  example: '@Felipe?',
  description: {
    en: 'remove a member from the group',
    pt: 'remove um membro do grupo'
  },
  
  async run(client, message, args) {
    const { invUser, banAdmErr, commandErr } = client.lang;
    const member = args[0].replace(/@/, '') + '@c.us';
    const membersList = await client.getGroupMembersId(message.from);
    const admList = await client.getGroupAdmins(message.from);

    if (!membersList.includes(member)) {
      client.reply(message.from, invUser, message.id);
      return;
    }

    if (admList.includes(member)) {
      client.reply(message.from, banAdmErr, message.id);
      return;
    }

    try {
      await client.removeParticipant(message.from, member);
    } catch (err) {
      client.reply(message.from, commandErr, message.id);
      console.error(err);
    }

  }
};
