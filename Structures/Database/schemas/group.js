const { Schema, model } = require('mongoose');

const groupSchema = new Schema({
  _id: { type: String, require: true },
  lang: { type: String, default: 'en' },
  prefix: String

});

module.exports = model('Group', groupSchema);
