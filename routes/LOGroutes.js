const express = require('express');
const router = express.Router();
const { postlogin, postregister } = require('./LOGcontrols');

// POST route for login
router.post('/login', postlogin);

// POST route for registration
router.post('/register', postregister);

// You can add other routes related to login, registration, and user sessions as needed
// For example, if you want to render the login page when a GET request is made
router.get('/login', (req, res) => {
    res.render('login'); // Renders login.ejs
});

// Similarly, if you want to render the registration page on a GET request
router.get('/register', (req, res) => {
    res.render('register'); // Renders register.ejs
});

// If you want to add a logout route
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Error during logout');
        }
        res.redirect('/login'); // Redirect to login page after logout
    });
});

module.exports = router;
