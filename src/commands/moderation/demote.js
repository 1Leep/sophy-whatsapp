module.exports = {
  name: 'demote',
  aliases: ['rebaixar'],
  permissions: ['USER', 'BOT'],
  args: true,
  usage: '<member>',
  example: '@Felipe?',
  description: {
    en: 'unset admin permission to the member',
    pt: 'retira a permissão de admin para o membro'
  },
  async run(client, message, args) {
    const { invUser, isNotAdm, sucessDemote, commandErr } = client.lang;
    const member = args[0].replace(/@/g, '') + '@c.us';
    const memberList = await client.getGroupMembersId(message.from);
    const admList = await client.getGroupAdmins(message.from);

    if (!memberList.includes(member)) {
      client.reply(message.from, invUser, message.id);
      return;
    }

    if (!admList.includes(member)) {
      client.reply(message.from, isNotAdm, message.id);
      return;
    }

    try {
      await client.demoteParticipant(message.from, member);
      await client.sendReplyWithMentions(message.from, sucessDemote(args[0]), message.id);
    } catch (err) {
      client.reply(message.from, commandErr, message.id);
      console.error(err);
    }

  }
}
