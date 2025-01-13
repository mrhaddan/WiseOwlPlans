const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const ejsMate = require('ejs-mate');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Plan = require('./models/plan');
const indexRouter = require('./routes/index');
const dbURL= process.env.MONGO_URI;
const session = require('express-session');
const MongoStore = require('connect-mongo');

dotenv.config();

mongoose.connect(dbURL);

const store = MongoStore.create({
    mongoUrl: dbURL,
    touchAfter: 24*60*60, // refreshes page per day
    crypto: {
        secret: 'thisshouldbeabettersecret!'
    }
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log('database connected');
})

app.use((req, res, next) => {
    next();
})

// Sets an almost global path for css and js files
app.use(express.static(path.join(__dirname, '/public')));

// This allows form data to be parsed
app.use(express.urlencoded({ extended: true }));

// This allows json data to be accessed
app.use(express.json());

// Set ejs
app.set('view engine', 'ejs');

// Set ejsMate
app.engine('ejs', ejsMate);

app.set('views', path.join(__dirname, 'views'));

app.use('/', indexRouter);

// app.all('*', (req, res, next) => {
//     const title = 'Error 404';
//     res.render('404', { title });
// })

// start the port to run the web app
app.listen(port, () => {
    console.log('Listening on port 3000');
})