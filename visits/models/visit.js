const mongoose = require('mongoose');

const visitSchema = mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: false },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  date: { type: String, required: true },
});

module.exports = mongoose.model('Visit', visitSchema);