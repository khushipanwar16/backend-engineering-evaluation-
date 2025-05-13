const express = require('express');
const mongoose = require('mongoose'); 
const path = require('path');
const bodyParser = require('body-parser');
const logRoutes = require('./routes/LOGroutes');
const hotelroutes = require('./routes/hotelroutes');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/voyagerdb')
.then(() => console.log(' Connected to MongoDB'))
.catch(err => console.error(' MongoDB connection error:', err));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, 'public')));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(hotelroutes); 
app.use('/', logRoutes); 


app.get('/', (req, res) => {
  res.render('index');
});


app.get('/dashboard', (req, res) => {
  res.render('index');
});


app.use((req, res) => {
  res.status(404).send('Page not found');
});


app.listen(port, () => {
  console.log(` Server running on http://localhost:${port}`);
});
