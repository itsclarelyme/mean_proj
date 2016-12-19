console.log('Angular controller');
var mongoose = require('mongoose');
// var Model = mongoose.model('Model');

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