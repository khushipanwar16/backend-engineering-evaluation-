const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const { postregister, postlogin } = require('./controllers/LOGcontrols');
const { generateErrorMessage, generateSuccessMessage } = require('./utility/helpfunction.js');
const app = express();
const port = 3000;

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(bodyParser.json()); // For parsing application/json

// Set up static file serving for CSS, images, etc.
app.use(express.static(path.join(__dirname, 'public')));

// Set up view engine (EJS for rendering dynamic HTML)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Home route
app.get('/', (req, res) => {
    res.render('index'); // No session data anymore
});

// Login route (GET and POST)
app.get('/login', (req, res) => {
    res.render('login', { errorMessage: null }); // No session check here
});
  
app.post('/login', postlogin); // Handle login form submission

// Registration route (GET and POST)
app.get('/register', (req, res) => {
    res.render('register', { errorMessage: null }); // No session check here
});
  
app.post('/register', postregister); // Handle register form submission





// Success page route
// app.get('/success', (req, res) => {
//     res.render('success', { dashboardLink: '/dashboard' }); // ✅ Pass the variable
// });


// // Failure page route
// app.get('/failed', (req, res) => {
//     res.render('failed'); // Render failed login page without session
// });






// Dashboard route (protected route, remove session checks)
app.get('/dashboard', (req, res) => {
    // Here you need to implement an alternative for user authentication (maybe a cookie or token)
    res.render('index'); // Render dashboard (for now rendering index)
});

// Logout route
app.get('/logout', (req, res) => {
    // No session data to destroy
    res.redirect('/login'); // Redirect to login after logout
});

// 404 route (for unmatched routes)
app.use((req, res) => {
    res.status(404).send('Page not found');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
