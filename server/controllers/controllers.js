console.log('Angular controller');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Event = mongoose.model('Event');
var Intro = mongoose.model('Intro');
var Community = mongoose.model('Community');
var Interaction = mongoose.model('Interaction');

function Controller(){
	this.method = function(req, res){
		console.log("controller method");
		Model.find({}, function(err, data){
			if(err){
				console.log("Error in controller: ", + err);
			}
			res.json(data);
		})
	}









}

module.exports = new Controller();