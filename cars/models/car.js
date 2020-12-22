const mongoose = require('mongoose');

const carSchema = mongoose.Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  years: { type: Number, required: false },
  matriculationNbr: { type: String, required: true },
  autonomy: { type: Number, required: true },
});

module.exports = mongoose.model('Car', carSchema);