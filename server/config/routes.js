var mongoose = require('mongoose');
//var Model = mongoose.model('Model');

var controller = require('../controllers/controllers.js');

module.exports = function(app){
	app.get('/route', function(req, res){
		console.log('routes name');
		controller.method(req, res);
	})
}