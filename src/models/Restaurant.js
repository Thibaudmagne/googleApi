const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
  nom: String,
  adresse: String,
  type: [String],
  budget: Number,
  capacite: Number
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);