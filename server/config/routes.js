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

  app.get('/comm', function(req, res){
		console.log('retrieve all community');
		controller.comm_get(req, res);
	})

	app.post('/comm/new', function(req, res){
		console.log('create new comm');
		controller.comm_new(req, res);
	})

	app.post('/user/new', function(req, res){
		console.log('create new user');
		controller.new_user(req, res);
	})

	app.get('/user', function(req, res){
		console.log("retrieve all users");
		controller.get_user(req, res);
	})

	app.get('/user/:id', function(req, res){
		console.log("retrieve all users");
		controller.get_userinfo(req, res);
	})

	app.post('/comm/request', function(req, res){
		console.log("request to join");
		controller.comm_req(req, res);
	})

	app.post('/req/remove', function(req, res){
		console.log("removing the requesting comm");
		controller.remove_comm_req(req, res);
	})

}

