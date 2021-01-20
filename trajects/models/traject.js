const mongoose = require('mongoose');

const trajectSchema = mongoose.Schema({
  name: { type: String, required: true },
  startCoord: { type: Array, required: true },
  startName: { type: String, required: true },
  endCoord: { type: Array, required: true },
  endName: { type: String, required: true },
  userId: { type: String, required: true },
  distance: { type: Number, required: true },
  date : { type: String, required: true },
  carId: {type: String, required: true},
  carName: {type: String, required: true},
  stations: {type: Array, required: false},
  chargingNecessary: {type: Boolean, required: false},
});

module.exports = mongoose.model('Traject', trajectSchema);