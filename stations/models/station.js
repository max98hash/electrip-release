const mongoose = require('mongoose');

const stationSchema = mongoose.Schema({
  stationName: { type: String, required: true },
  address: { type: String, required: true },
  position: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  },
});

module.exports = mongoose.model('Station', stationSchema);