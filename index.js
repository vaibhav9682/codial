const cookieParser = require('cookie-parser');
const express = require('express');
const expressLayout = require('express-ejs-layouts');
const port = 9000;
const app = express();
const db = require('./config/mongoose')

// Used for session cookie
const session = require('express-session')
const passport = require('passport')
const passportLocal = require('./config/passport-local-strategy')


app.use(cookieParser());
app.use(express.urlencoded())
app.use(express.static('static'));
app.use(expressLayout)

app.set('layout extractStyles', true);
app.set('layout extraxtScripts', true);


app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: 'codial',
    // todo change secret before deploying on server
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);



// use express router
app.use('/', require('./routes'));


app.listen(port, function (err) {
    if (err) {
        console.log(`error in strating express server on port: ${port}`);
    }
    console.log(`express server is running on port: ${port}`);
})



