module.exports = {
  name: 'add',
  aliases: ['adicionar'],
  permissions: ['USER', 'BOT'],
  args: true,
  usage: '<user>',
  example: '@Felipe?',
  description: {
    en: 'add a user to group',
    pt: 'adiciona um usuário ao grupo '
  },

  async run(client, message, args) {
    const { invUser, commandErr } = client.lang;
    const user = args[0].replace(/@/, '') + '@c.us';
    const userStatus = await client.checkNumberStatus(user);

    if (!userStatus.numberExists) {
      client.reply(message.from, invUser, message.id);
      return;
    }

    try {
      await client.addParticipant(message.from, user);
    } catch (err) {
      client.reply(message.from, commandErr, message.id);
      console.error(err);
    }

  }
};
