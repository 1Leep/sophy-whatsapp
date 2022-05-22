const { Schema, model } = require('mongoose');

const profileSchema = new Schema({
  _id: { type: String, require: true }, 
  buffer: Buffer
});

module.exports = model('ProfilePic', profileSchema);
