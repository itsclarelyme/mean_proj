var mongoose = require('mongoose');
var User = mongoose.model('User');
var Event = mongoose.model('Event');
var Intro = mongoose.model('Intro');
var Community = mongoose.model('Community');
var Message = mongoose.model('Message');

var controller = require('../controllers/controllers.js');
var users = require('../controllers/users.js');


module.exports = function(app) {

  //users
  app.get('/users', users.index);
  app.get('/users/:id', users.index_login);
  app.post('/login', users.login);
  app.post('/register', users.register);
  app.post('/profile', users.add_profile);
	app.get('/logout', users.logout);
	app.route('/api/users/picture').post(users.changeProfilePicture);
	app.route('/api/users/change-password').post(users.changePassword);
  	app.route('/api/users/delete-user').post(users.removeUser);
	app.route('/api/users/get-reviews/:id').get(controller.getReviews);

  	app.get('/comm', function(req, res){
		console.log('retrieve all community');
		controller.comm_get(req, res);
	});

	app.route('/comm/:id')
		.get(controller.comm_getinfo)
		.put(controller.comm_update)
		.delete(controller.comm_delete);

	app.post('/comm/new', function(req, res){
		console.log('create new comm');
		controller.comm_new(req, res);
	});

	app.post('/user/new', function(req, res){
		console.log('create new user');
		controller.new_user(req, res);
	});

	app.get('/user', function(req, res){
		console.log("retrieve all users");
		controller.get_user(req, res);
	});

	app.get('/user/:id', function(req, res){
		console.log("retrieve all users");
		controller.get_userinfo(req, res);
	});

	app.post('/comm/request', function(req, res){
		console.log("request to join");
		controller.comm_req(req, res);
	});

	app.post('/comm/approve-request', function(req, res){
		console.log("approve request");
		controller.comm_approve_req(req, res);
	});

	app.post('/req/remove', function(req, res){
		console.log("removing the requesting comm");
		controller.remove_comm_req(req, res);
	});

	app.post('/event/new', function(req, res){
		console.log("removing the requesting comm");
		controller.add_event(req, res);
	});

	app.post('/event/complete', function(req, res){
		controller.complete_event(req, res);
	});

	app.get('/comm/events/:commid', function(req, res){
		console.log("getting all events from comm");
		controller.get_commevent(req, res);
	});

	app.get('/event/:id', function(req, res){
		console.log("getting all events from comm");
		controller.get_event(req, res);
	});

	app.post('/event/join', function(req, res){
		console.log("joinning this event");
		controller.join_event(req, res);
	});

	app.get('/msg/:evntid', function(req, res){
		console.log("getting all msgs from event");
		controller.get_msg(req, res);
	});

	app.post('/msg/new', function(req, res){
		console.log("adding a new msg");
		controller.add_msg(req, res);
	})

};