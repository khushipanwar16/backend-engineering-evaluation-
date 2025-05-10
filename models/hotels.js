// models/hotels.js
const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: String,
  location: String,
  image: String,
  description: String,
  pricePerNight: Number
});

module.exports = mongoose.model('hotels', hotelSchema);
