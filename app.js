const express = require('express');
const mongoose = require('mongoose'); // MongoDB connection
const path = require('path');
const bodyParser = require('body-parser');
const { postregister, postlogin } = require('./controllers/LOGcontrols');
const logRoutes = require('./routes/LOGroutes');
const hotelroutes = require('./routes/hotelroutes');

// Initialize express app
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/voyagerdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log(' Connected to MongoDB'))
.catch(err => console.error(' MongoDB connection error:', err));

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use(hotelroutes); // Hotels route
app.use('/', logRoutes); // Login/register routes

// Home route
app.get('/', (req, res) => {
  res.render('index');
});

// Dashboard route
app.get('/dashboard', (req, res) => {
  res.render('index');
});

// 404 fallback route
app.use((req, res) => {
  res.status(404).send('Page not found');
});

// Start the server
app.listen(port, () => {
  console.log(` Server running on http://localhost:${port}`);
});
