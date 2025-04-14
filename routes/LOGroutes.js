const express = require('express');
const router = express.Router();
const { postlogin, postregister } = require('../controllers/LOGcontrols'); // Importing controller functions

// POST route for login
router.post('/login', (req, res) => {
    postlogin(req, res, (errorMessage) => {
        if (errorMessage) {
            return res.render('login', { errorMessage }); // Passing errorMessage to the view
        }
        res.redirect('/dashboard'); // On successful login, redirect
    });
});

// POST route for registration
router.post('/register', (req, res) => {
    postregister(req, res, (errorMessage) => {
        if (errorMessage) {
            return res.render('register', { errorMessage }); // Passing errorMessage to the view
        }
        res.redirect('/dashboard'); // On successful registration, redirect
    });
});


// For login route (GET)
router.get('/login', (req, res) => {
    res.render('login', { errorMessage: null }); // Passing null for errorMessage initially
});

// For register route (GET)
router.get('/register', (req, res) => {
    res.render('register', { errorMessage: null }); // Passing null for errorMessage initially
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

    res.render('destination', { destinations }); // Pass destinations data to the view
});

// GET route for logout
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Error during logout');
        }
        res.redirect('/login'); // Redirect to login after logout
    });
});




module.exports = router;
