const user = require('../../Structures/Database/schemas/user.js');
const numbers = require('./numbers.js');

const Rank = {

  async getRank() {
    const all = await user.find();
    const arraySort = all.sort((a, b) => b.xp - a.xp);
    const rankMap = arraySort.map(i => ({
        user: '@' + i._id.replace('@c.us', ''),
        xp: i.xp
      }));
    return rankMap;
  },

  async showPosition(userMention) {
    const rankArray = await Rank.getRank();
    const position = rankArray.findIndex(({ user }) => user === userMention) + 1;
    return position;
  },

  async showRank() {
    let pos = 1;
    const rank = await Rank.getRank();
    return rank.map(i => ` ❘ *${Rank.getNumb(pos++)}* ${i.user}\n ❘ ➜ *❲${i.xp} Xp❳*\n ❘`).join('\n');
  },

  getNumb(numb) {
    const arrayFromNumb = Array.from(String(numb), Number);
    return arrayFromNumb.map(i => numbers[i]).join('');
  }
};

module.exports = Rank;
