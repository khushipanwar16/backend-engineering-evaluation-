const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { postregister, postlogin } = require('./controllers/LOGcontrols'); // Controllers for login and register
const logRoutes = require('./routes/LOGroutes'); // Routes file for login, register, etc.

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

// Routes
app.use('/', logRoutes);


// Home route
app.get('/', (req, res) => {
    res.render('index'); // Render home page
});

// Dashboard route
app.get('/dashboard', (req, res) => {
    res.render('index'); // Placeholder for now
});


// 404 route
app.use((req, res) => {
    res.status(404).send('Page not found');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
