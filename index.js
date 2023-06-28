const cookieParser = require('cookie-parser');
const express = require('express');
const expressLayout = require('express-ejs-layouts');
const port = 8000;
const app = express();
const db = require('./config/mongoose')



// Used for session cookie
const session = require('express-session')
const passport = require('passport')
const passportLocal = require('./config/passport-local-strategy')
const passportJWT = require('./config/passport-jwt-strategy')
const MongoStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash')
const customMware = require('./config/middleware');





app.use(cookieParser());
app.use(express.urlencoded())

//make the uploads path available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(express.static('static'));
app.use(expressLayout)

app.set('layout extractStyles', true);
app.set('layout extraxtScripts', true);


app.set('view engine', 'ejs');
app.set('views', './views');



// mongo store is used to store the session cookie in db
app.use(session({
    name: 'codial',
    // todo change secret before deploying on server
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
    ,

    store: new MongoStore(
        {

            uri: 'mongodb://127.0.0.1:27017/codial_development_DB',
            autoRemove: 'disabled'

        },
        function (err) {
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);

// use express router
app.use('/', require('./routes'));


app.listen(port, function (err) {
    if (err) {
        console.log(`error in strating express server on port: ${port}`);
    }
    console.log(`express server is running on port: ${port}`);
})



