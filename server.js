// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.urlencoded({ extended: true }));
// parse json from req.body
app.use(bodyParser.json());
// Require path
var path = require('path');
// listening port
var port = process.env.PORT || 8000;
// Setting our Static Folder Directory

app.use(express.static(path.join(__dirname, './client')));
app.use(express.static(path.join(__dirname, './bower_components')));

// require the mongoose configuration file which does the rest for us
require('./server/config/mongoose.js');

var routes_setter = require('./server/config/routes.js');

routes_setter(app);

// Setting our Server to Listen on Port: 8000
app.listen(port, function() {
    console.log('Community Helper - server running on port :' + port);


});



//admin@ilendyou.com