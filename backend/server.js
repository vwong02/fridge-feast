// load .env data into process.env
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Web server config
const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require("cors");

const PORT = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'ejs');

app.use(session({
  name: "session",
  secret: [ "cheese", "chicken", "capybara" ]
}));

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Use body-parser middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userRoute = require('./routes/users');
const recipeRoute = require('./routes/recipes');
const favoriteRoute = require('./routes/favorites');
const searchRoute = require('./routes/search');
const registerRoute = require('./routes/register');
const reviewRoute = require('./routes/reviews');
const ingredientRoute = require('./routes/ingredients');
const homepageRoute = require('./routes/homepage');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/users', userRoute);
app.use('/recipes', recipeRoute);
app.use('/fav', favoriteRoute);
app.use('/register', registerRoute);
app.use('/reviews', reviewRoute);
app.use('/ingredients', ingredientRoute);
app.use('/home', homepageRoute);
app.use('/s', searchRoute);

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  //res.redirect('/');
  res.send("Hello - World!");
});



app.listen(PORT, () => {
  console.log(`Example app listening on port ${ PORT }`);
});

