var mongoose = require('mongoose');
var User = mongoose.model('User');
var Event = mongoose.model('Event');
var Intro = mongoose.model('Intro');
var Community = mongoose.model('Community');
var Interaction = mongoose.model('Interaction');

var controller = require('../controllers/controllers.js');
var users = require('../controllers/users.js');


module.exports = function(app) {

  app.get('/users', users.index);
  app.post('/login', users.login);
  app.post('/register', users.register);

}

