const express = require("express");
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const cors = require("cors")

const app = express();

app.use(cors());

//DB config
const db = require('./config/db').MongoURI;

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

//Bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use('/users', require('./routes/users'));
app.use('/restaurant', require('./routes/restaurants'));
app.use('/newRestaurant', require('./routes/newRestaurant'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server start running on port ${PORT}`));
