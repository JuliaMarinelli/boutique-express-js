var express     = require('express');
var createError = require('http-errors');
var path        = require('path');
var bodyParser  = require('body-parser');
var app         = express();

app.use(bodyParser.urlencoded({extended: true}));

app.set('views', path.join(__dirname, 'views'));

app.use('/', require('./controllers/product.controller'));
app.set('view engine', 'blade');
app.use(express.static(path.join(__dirname, 'public')));


app.listen(5500, function(){
    console.log('server started...')
})

module.exports = app;