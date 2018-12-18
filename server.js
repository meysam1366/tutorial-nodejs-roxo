const express = require('express');
const hbs = require('hbs');
var app = express();
const fs = require('fs');

app.use(express.static('public'));
app.set('view engine','hbs');

app.use((req,res,next) => {
    var now = new Date().toLocaleTimeString();
    var log = `${now}: ${req.method} : ${req.url}`;
    console.log(log);
    fs.appendFileSync('server.log',log + '\n');
    next();
});

app.use((req,res,next) => {
    res.render('offline.hbs');
});

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear',() => {
    return new Date().getFullYear();
});
hbs.registerHelper('upperCase',(text) => {
    return text.toUpperCase();
});

app.get('/',(req,res) => {
    res.render('home.hbs',{
        pageTitle: " صفحه اصلی سایت",
        welcomeMessage: "hello world",
    });
});

app.get('/about',(req,res) => {
    var title = "درباره ما";
    res.render('about.hbs',{pageTitle: title});
});

app.get('/bad',(req,res) => {
    res.send({
        error: 'Unable to fetch data'
    });
});

app.listen(3000,() => {
    console.log("Run server on port 3000");
});