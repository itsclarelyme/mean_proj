var mongoose = require('mongoose');
var User = mongoose.model('User');
var Event = mongoose.model('Event');
var Intro = mongoose.model('Intro');
var Community = mongoose.model('Community');
var Interaction = mongoose.model('Interaction');

var controller = require('../controllers/controllers.js');
var users = require('../controllers/users.js');


module.exports = function(app) {

  //users
  app.get('/users', users.index);
  app.get('/users/:id', users.index_login);
  app.post('/login', users.login);
  app.post('/register', users.register);
  app.post('/profile', users.add_profile);

}

