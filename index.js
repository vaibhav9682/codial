const e = require('express');
const express = require('express');
const expressLayout = require('express-ejs-layouts');
const port = 9000;
const app = express();

app.use(express.static('static'));
app.use(expressLayout)
app.set('layout extractStyles', true);
app.set('layout extraxtScripts', true);
app.use('/', require('./routes'));


app.set('view engine', 'ejs');
app.set('views', './views');





app.listen(port, function (err) {
    if (err) {
        console.log(`error in strating express server on port: ${port}`);
    }
    console.log(`express server is running on port: ${port}`);
})



