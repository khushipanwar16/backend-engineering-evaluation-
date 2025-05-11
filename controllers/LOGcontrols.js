const bcrypt = require('bcrypt');
const User = require('../models/users'); // Mongoose model

// Handle login logic using MongoDB
const postlogin = async (req, res) => {
    const { uname, upwd } = req.body;

    try {
        const user = await User.findOne({ username: uname });

        if (!user) {
            // Redirect to failed page if user not found
           return res.render('failed', { errorMessage: 'User not found. Please check your username or register.' });

        }

        const isMatch = await bcrypt.compare(upwd, user.password);

        if (!isMatch) {
            return res.render('login', { errorMessage: 'Incorrect password. Please try again.' });
        }

        // Login successful
        res.render('success', { dashboardLink: '/dashboard' });
    } catch (err) {
        console.error('Login error:', err);
        res.render('login', { errorMessage: 'Internal server error. Please try again later.' });
    }
};

// Handle registration logic using MongoDB
const postregister = async (req, res) => {
    const { uname, upwd } = req.body;

    try {
        const existingUser = await User.findOne({ username: uname });

        if (existingUser) {
            return res.render('register', { errorMessage: 'Username already exists. Please choose another.' });
        }

        const hashedPassword = await bcrypt.hash(upwd, 10);

        const newUser = new User({
            username: uname,
            password: hashedPassword
        });

        await newUser.save();

        res.render('success', { dashboardLink: '/' });
    } catch (err) {
        console.error('Registration error:', err);
        res.render('register', { errorMessage: 'Internal server error. Please try again later.' });
    }
};

module.exports = { postlogin, postregister };
