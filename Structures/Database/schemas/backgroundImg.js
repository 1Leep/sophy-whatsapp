const { Schema, model } = require('mongoose');

const backgroundSchema = new Schema({
  _id: { type: String, require: true },
  buffer: Buffer
});

module.exports = model('BackgroundImg', backgroundSchema);
