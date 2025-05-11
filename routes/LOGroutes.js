const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { postlogin, postregister } = require('../controllers/LOGcontrols'); 
const { readReviews, writeReviews } = require('../utility/helpfunction');


router.post('/login', (req, res) => {
    postlogin(req, res, (errorMessage) => {
        if (errorMessage) {
            return res.render('login', { errorMessage });
        }
        res.redirect('/dashboard');
    });
});


router.post('/register', (req, res) => {
    postregister(req, res, (errorMessage) => {
        if (errorMessage) {
            return res.render('register', { errorMessage });
        }
        res.redirect('/dashboard');
    });
});

router.get('/login', (req, res) => {
    res.render('login', { errorMessage: null });
});


router.get('/register', (req, res) => {
    res.render('register', { errorMessage: null });
});

// GET route for destinations page
router.get('/destination', (req, res) => {
    const destinations = [
        {
            name: 'Lofoten Islands, Norway',
            description: 'A breathtaking archipelago known for dramatic peaks, secluded beaches, and rich outdoor adventures.',
            image: '/dest1.png'
        },
        {
            name: 'Matera, Italy',
            description: 'A UNESCO World Heritage Site famed for its ancient cave dwellings and captivating historical atmosphere.',
            image: '/dest2.png'
        },
        {
            name: 'Socotra Island, Yemen',
            description: 'An untouched paradise with unique biodiversity and stunning landscapes, often called the Galápagos of the Indian Ocean.',
            image: '/dest3.png'
        },
        {
            name: 'Kyoto, Japan',
            description: 'A city of timeless beauty, known for its classical Buddhist temples, gardens, imperial palaces, and traditional wooden houses.',
            image: '/dest4.jpg'
        },
        {
            name: 'Banff National Park, Canada',
            description: 'Home to turquoise glacial lakes, majestic mountains, and wildlife, Banff is a dream for nature lovers and adventurers.',
            image: '/dest5.jpg'
        }
    ];

    res.render('destination', { destinations });
});

// GET route for review page
router.get('/review', (req, res) => {
    const reviews = readReviews();
    res.render('review', { reviews });
});

// POST route to submit a review
router.post('/review', (req, res) => {
    const { comment, rating } = req.body;

    const newReview = {
        user: 'Anonymous',
        rating: parseInt(rating),
        comment,
        date: new Date().toLocaleString()
    };

    const reviews = readReviews();
    reviews.push(newReview);
    writeReviews(reviews);

    res.redirect('/review');
});

// GET route for logout (no session logic)
router.get('/logout', (req, res) => {
    res.redirect('/login'); // Just redirect without destroying session
});

module.exports = router;
