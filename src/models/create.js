const group = require('../../Structures/Database/schemas/group.js');
const user = require('../../Structures/Database/schemas/user.js');
const profilePic = require('../../Structures/Database/schemas/profilePic.js');
const backgroundImg = require('../../Structures/Database/schemas/backgroundImg.js');

module.exports = async function(type, id) {
  if (type === 'group') {
    (await group.create({ _id: id })).save();
  }
  
  if (type === 'user') {
    (await user.create({ _id: id })).save();
  }
  
  if (type === 'profile') {
    (await profilePic.create({ _id: id })).save();
  }
  
  if (type === 'background') {
    (await backgroundImg.create({ _id: id })).save();
  }
}
