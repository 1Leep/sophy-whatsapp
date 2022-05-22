const word = require('../../utils/baseAnagram.js');
const wait = require('timers/promises').setTimeout;
const randomNumb = require('../../utils/getRandomNumber.js');
const user = require('../../../Structures/Database/schemas/user.js');
const items = require('../../../Structures/items.js');
const inventory = require('../../models/inventory.js');

module.exports = {
  name: 'anagram',
  aliases: ['anagrama'],
  cooldown: 60,
  usage: '',
  example: '',
  description: {
    en: 'Play the famous anagram game',
    pt: 'Jogue o famoso jogo anagrama'
  },
  async run(client, message, args) {
    const { lang } = client;
    const { name, shuffledName, hint } = word(lang.name);

    await client.sendText(message.from, lang.willBeSent(3));
    await wait(3000);
    await client.sendText(message.from, lang.questAnagram(shuffledName, hint, 30));

    const filter = msg => msg.body && msg.body.toLowerCase() === name;
    const collector = client.createMessageCollector(message.from, filter, { max: 1, time: 30_000 });

    client.cooldown.get(message.from)
      .set(`${this.name}_${message.author}`, Date.now());

    collector.on('collect', async (response) => {
      const data = await user.findOne({ _id: response.author });
      const reward = randomNumb(5, 20);
      const rewardItem = items[~~(Math.random() * items.length)];

      data.money = data.money + reward;
      await inventory.addItem(data, rewardItem);
      await data.save();

      await client.reply(message.from, lang.correctAnswer(reward), response.id);
    });

    collector.on('end', ({ size }) => {
      if (!size) client.sendText(message.from, '⏰❌');
    });

  }
};
