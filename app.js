/* =======================
    LOAD THE DEPENDENCIES
==========================*/
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const authMiddleware = require('./middlewares/auth');
const cors = require('cors');
const passport = require('passport');

/* =======================
    LOAD THE CONFIG
==========================*/
const config = require('./config');
const port = process.env.PORT || 3000;

/* =======================
    EXPRESS CONFIGURATION
==========================*/
const app = express({strict: true});
app.use(express.static(__dirname + '/public'));

// parse JSON and url-encoded query
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// print the request log on console
app.use(morgan('dev'));

// set the secret key variable for jwt
app.set('jwt-secret', config.jwtSecret);

app.use(cors());

require('./passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

// index page, just for testing
app.get('/', (req, res) => {
    // res.send('Hello JWT');
    res.sendFile(path.resolve(__dirname, './public/index.html'));
});
app.get('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/login.html'));
});
app.get('/welcome', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/welcome.html'));
});

// configure api router
app.use('/api', require('./routes/api'));

// open the server
app.listen(port, () => {
    console.log(`Express is running on port ${port}`);
});



/* =======================
    CONNECT TO MONGODB SERVER
==========================*/
mongoose.connect(config.mongodbUri, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', ()=>{
    console.log('connected to mongodb server');
});