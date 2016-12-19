var mongoose = require('mongoose');
var User = mongoose.model('User');
var Event = mongoose.model('Event');
var Intro = mongoose.model('Intro');
var Community = mongoose.model('Community');
var Interaction = mongoose.model('Interaction');

var controller = require('../controllers/controllers.js');

module.exports = function(app){
	app.get('/route', function(req, res){
		console.log('routes name');
		controller.method(req, res);
	})
}