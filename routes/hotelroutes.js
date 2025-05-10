const express = require('express');
const router = express.Router();
const Hotel = require('../models/hotels');

// Route to display hotels
router.get('/hotels', async (req, res) => {
  const searchQuery = req.query.location;
  try {
    let hotels;
    if (searchQuery) {
      const regex = new RegExp(searchQuery, 'i'); // case-insensitive search
      hotels = await Hotel.find({ location: regex });
    } else {
      hotels = await Hotel.find({});
    }

    // Pass both hotels and searchQuery to the view
    res.render('hotels', { hotels, searchQuery });
  } catch (error) {
    console.error('Error fetching hotels:', error);
    res.status(500).send('Error fetching hotel data');
  }
});

module.exports = router;
