const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  _id: { type: String, require: true },
  xp: { type: Number, default: 0 },
  money: { type: Number, default: 0 },
  level: { type: Number, default: 0 },
  inventory: { type: Array, default: [] }, 
  customPfp: Boolean, 
  customBg: Boolean, 
  blacklist: Boolean, 
  profilePic: { type: String, default: './src/media/profile/default.jpg' },
  backgroundTheme: { type: String, default: 'darkness' }
});

module.exports = model('User', userSchema);
