const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  location: { type: String, required: true },
  sport: { type: String, required: true },
  bio: { type: String }
});

module.exports = mongoose.model('Profile', profileSchema);
