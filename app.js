//??  youtube  traversy - search for - google strategy express js  -

// const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const passport = require('passport')
const session = require('express-session');

const connectDB = require('./config/db')

// LOAD confing 
dotenv.config({ path:'./config/config.env' })

// Passport configuration
require('./config/passport')(passport)

// DB Connection  (see config db.js as well)

connectDB()

const app = express()


//Logging
if (process.env.NODE_ENV == 'development') {
    app.use(morgan('dev'))
}

// Handlebars
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

// Sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    // cookie: { secure: true }
  }))

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Static assets
app.use(express.static('public'))

// Routes

app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`
App running in ${process.env.NODE_ENV} mode at PORT: ${PORT}`))

