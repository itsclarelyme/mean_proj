console.log('Angular controller');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Event = mongoose.model('Event');
var Intro = mongoose.model('Intro');
var Community = mongoose.model('Community');
var Interaction = mongoose.model('Interaction');

function Controller(){
	// this.comm_get = function(req, res){
	// 	console.log("controller get all comm method");
	// 	Community.find({}, function(err, data){
	// 		if(err){
	// 			console.log("Error in controller get comm: ", + err);
	// 		}
	// 		console.log(data);
	// 		res.json(data);
	// 	})
	// }

	this.comm_get = function(req, res){
		console.log("controller get all comm method");
		Community.find({}).populate('comms').populate('req_comms').exec(function(err, data){
			if(err){
				console.log("error in new comm: " + err);
			}
			console.log(data);
			res.json(data);
		})
	}

	this.comm_new = function(req, res){
		console.log("controller add comm");
		console.log(req.body);
		User.findOne({_id: req.body.admin}, function(err, user){
			if(err){
				console.log("error finding one user: " + err);
			}
			var newcomm = new Community(req.body);
			newcomm.member.push(user);
			user.comms.push(newcomm);
			user.save();
			newcomm.save(function(err){
				if(err){
					console.log("error in new comm: " + err);
				}
				res.redirect('/comm');
			})

		})
	}

	this.comm_req = function(req, res){
		console.log("controller request to join comm");
		User.findOne({_id: req.body.user}, function(err, user){
			if(err){
				console.log("find requesting user: " + err);
			}
			Community.findOne({_id: req.body.comm}, function(err, comm){
				if(err){
					console.log("find requesting comm: " + err);
				}
				user.req_comms.push(comm);
				user.save(function(err){
					if(err){
						console.log("adding the req comm into user:" + err);
					}
				})
				comm.requester.push(user);
				comm.save(function(err){
					if (err) {
						console.log("adding the request")
					};
					res.redirect('/comm');
				})
			})
		})
	}


	this.new_user = function(req, res){
		console.log("controller add user");
		console.log(req.body);
		var newuser = new User(req.body);
		newuser.save(function(err){
			if(err){
				console.log("add new user: " + err);
			}
			User.find({}, function(err, data){
				if(err){
					console.log("err return all users")
				}
				res.json(data);
			})
		})
	}

	this.get_user = function(req, res){
		console.log("controller get all users");
		User.find({}, function(err, data){
			if(err){
				console.log("Error in controller: ", + err);
			}
			res.json(data);
		})
	}

	this.get_userinfo = function(req, res){
		console.log("controller get all user info");
		User.findOne({_id: req.params.id}).populate('comms').populate('req_comms').exec(function(err, data){
			if(err){
				console.log("Error in controller: ", + err);
			}
			console.log(data);
			res.json(data);
		})
	}

	this.remove_comm_req = function(req, res){
		console.log("controller remove request");
		User.update({_id: req.body.user}, {$pull: {req_comms: req.body.comm}}).exec(function(err, user){
			if(err){
				console.log("Error in controller: ", + err);
			}
			console.log(user);
			//update community request list
			Community.update({_id: req.body.comm}, {$pull: {req_comms: req.body.user}}).exec(function(err, comm){
				if(err){
					console.log("Error in controller: ", + err);
				}
				res.json(user);
			});
		});

	}









}

module.exports = new Controller();