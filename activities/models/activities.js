const mongoose = require('mongoose');

const activitySchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  start: { type: String, required: true },
  end: { type: String, required: false },
  category: { type: String, required: true },
  userId: { type: String, required: true },
});

module.exports = mongoose.model('Activity', activitySchema);