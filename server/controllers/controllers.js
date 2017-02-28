console.log('Angular controller');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Event = mongoose.model('Event');
var Intro = mongoose.model('Intro');
var Community = mongoose.model('Community');
var Message = mongoose.model('Message');
var Review = mongoose.model('Review');

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

	// get list of communities
	this.comm_get = function(req, res){
		console.log("controller get all comm method");
		var query = req.query || {};
		Community.find(query).deepPopulate('admin._intro').populate('requester').populate('member').exec(function(err, data){
			if(err){
				console.log("error in new comm: " + err);
			}
			//console.log(data);
			res.json(data);
		})
	};

	// get detail info of a comm
	this.comm_getinfo = function(req, res){
		console.log("controller get this specific comm method");
		//console.log(req.params);
		Community.findOne({_id: req.params.id}).populate('admin').deepPopulate(['requester._intro', 'member._intro', 'events.poster._intro']).exec(function(err, data){
			if(err){
				return res.status(422).send({message: 'fail get info of comm'});
			}
/*
			User.populate(data, {path: 'member._intro', select: '_id', model: Intro}, function(err, data){
				console.log(data);
				res.json(data);
			})
*/
			res.json(data);
		})
	};

	// update a comm
	this.comm_update = function(req, res){
		var id = req.params.id;
		if (!id)
			return res.status(422).send({message: 'invalid request'});
		Community.update({_id: id}, req.body, {multi: false}, function(err){
			if (err)
				res.status(422).send({message: 'fail update'});
			else
				res.send({message: 'update successfully'});
		})
	};

	// approve or reject a join request
	this.comm_approve_req = function(req, res){
		var id = req.body.id,
			userId = req.body.userId,
			approved = req.body.approved;

		if (!id)
			return res.status(422).send({message: 'invalid request'});
		Community.findOne({_id: id}, function(err, comm){
			if (err || !comm)
				return res.status(422).send({message: 'can not find community'});

			User.findOne({_id: userId}, function(err, userData){
				if (err || !userData)
					return res.status(422).send({message: 'can not find user'});

				var index = comm.requester.indexOf(userId);
				console.log('------ index :' + index);
				if (index > -1){
					if (approved){
						comm.member.push(userData._id);
						userData.comms.push(comm._id);
					}
					comm.requester.splice(index, 1);
					userData.req_comms.splice(userData.req_comms.indexOf(comm._id), 1);
					comm.save();
					userData.save();
				}
				res.send({message: 'updated successfully.'});
			})
		})
	};

	// remove a comm
	this.comm_delete = function(req, res){
		var id = req.params.id;
		if (!id)
			return res.status(422).send({message: 'invalid request'});
		Community.remove({_id: id}, function(err){
			if (err)
				res.status(422).send({message: 'fail remove'});
			else
				res.send({message: 'removed successfully'});
		})
	};

	// get events of a comm
	this.get_commevent = function(req, res){
		console.log("controller getting all the events in this comm");
		//console.log(req.params);
		Event.find({_comm: req.params.commid}).populate('poster').populate('participants').exec(function(err, events){
			if(err){
				console.log("error finding all events in the comm: " + err);
			}
			console.log(events);
			res.json(events);
		})
	};

	// create a new comm
	this.comm_new = function(req, res){
		console.log("controller add comm");
		console.log(req.body);
		User.findOne({_id: req.body.admin}, function(err, user){
			if(err){
				console.log("error finding one user: " + err);
			}
			console.log(user);
			var newcomm = new Community(req.body);
			newcomm.member.push(user);
			user.comms.push(newcomm);
			user.save();
			newcomm.save(function(err){
				if(err){
					console.log("error in new comm: " + err);
					return res.status(422).send({message: 'fail create new comm.'});
				}
				res.send(newcomm);
			})
		})
	};

	// request a join to a comm
	this.comm_req = function(req, res){
		console.log("controller request to join comm");
		if (!req.body.user)
			return res.redirect('/login');
		User.findOne({_id: req.body.user}, function(err, user){
			if(err || !user){
				console.log("find requesting user: " + err);
				return res.redirect('/login');
			}
			Community.findOne({_id: req.body.comm}, function(err, comm){
				if(err){
					console.log("find requesting comm: " + err);
					return res.status(422).send(err);
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
	};


	// create a new user
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
	};

	// get list of users
	this.get_user = function(req, res){
		console.log("controller get all users");
		User.find({}).populate('_intro').exec(function(err, data){
			if(err){
				console.log("Error in controller: ", + err);
			}
			res.json(data);
		})
	};

	// get detail info of a user
	this.get_userinfo = function(req, res){
		console.log("controller get all user info");
		User.findOne({_id: req.params.id}).populate('comms').populate('req_comms').exec(function(err, data){
			if(err){
				console.log("Error in controller: ", + err);
			}
			//console.log(data);
			res.json(data);
		})
	};

	// remove a join request
	this.remove_comm_req = function(req, res){
		console.log("controller remove request");
		User.update({_id: req.body.user}, {$pull: {req_comms: req.body.comm}}).exec(function(err, user){
			if(err){
				console.log("Error in controller: ", + err);
			}
			//console.log(user);
			//update community request list
			Community.update({_id: req.body.comm}, {$pull: {requester: req.body.user}}).exec(function(err, comm){
				if(err){
					console.log("Error in controller: ", + err);
				}
				res.json(user);
			});
		});
	};

	// add a event to a comm
	this.add_event = function(req, res){
		console.log("Controller create new event");
		var newevent = new Event(req.body);
		newevent.save(function(err, thisevent){
			if(err){
				console.log("error creating new event: " + err);
			}
			//console.log(thisevent);
			Community.findOne({_id: req.body._comm._id}, function(err, comm){
				if(err){
					console.log("error adding new event to comm: " + err);
				}
				comm.events.push(thisevent);
				comm.save();
				res.json();
			})
		})
	};

	// get detail info of a event
	this.get_event = function(req, res){
		console.log("controller get event detail");
		Event.findOne({_id: req.params.id}).deepPopulate(['poster._intro', 'messages._author._intro']).populate('_comm').exec(function(err, thisevent){
			if(err){
				console.log("error getting event info: " + err);
			}
			console.log(thisevent);
			res.json(thisevent);
		})
	};


	// join to a event
	this.join_event = function(req, res){
		console.log("controller this user is joining this event");
		Event.findOne({_id : req.body.thisevent}, function(err, thisevent){
			if(err){
				console.log("error getting event info: " + err);
			}
			//console.log(thisevent);
			//console.log(req.body);
			User.findOne({_id: req.body.user}, function(err, thisuser){
				if(err){
					console.log("error getting event info: " + err);
				}	

				//console.log(thisuser);
				thisevent.participants.push(thisuser);
				thisevent.save();
				res.redirect('/event/' + req.body.thisevent);
			})
		})
	};

	// get messages of a event
	this.get_msg = function(req, res){
		//console.log("controller get msg for this event");
		//console.log(req.params);
		Message.find({_event: req.params.evntid}, function(err, data){
			if(err){
				console.log("Error in controller: " + err);
			}
			//console.log("these are all teh msgs");
			//console.log(data);
			res.json(data);
		})
	};

	// add a message to a event
	this.add_msg = function(req, res){
		var newmsg = new Message(req.body);
		if (!newmsg._event || !newmsg._author)
			return res.status(422).send({message: 'invalid request data'});
		Event.findOne({_id: newmsg._event}, function(err, event){
			if (err || !event)
				return res.status(422).send({message: 'can not find event.'});
			if (event.status)
				return res.status(422).send({message: 'sorry, this event was completed already.'});

			newmsg.save(function(err, msg){
				if(err)
					return res.status(422).send({message: 'fail reply.'});

				event.messages.push(newmsg._id);
				event.save(function(err){
					if(err)
						return res.status(422).send({message: 'fail reply.'});

					res.send(newmsg);
				});
			})
		})
	};

	// complete a event
	this.complete_event = function(req, res){
		var eventId = req.body.eventId,
			posterId = req.body.posterId,
			reviews = req.body.reviews || [];
		if (!eventId || !posterId)
			return res.status(422).send({message: 'invalid request'});
		Event.findOne({_id: eventId}, function(err, eventObj){
			if (err || !eventObj)
				return res.status(422).send({message: 'invalid post data'});
			eventObj.status = true;
			eventObj.save(function(err){
				var reviewArr = [];
				for (var i=0; i<reviews.length; i++){
					reviewArr.push({
						_event: eventObj._id,
						_poster: posterId,
						_user: reviews[i]._id,
						review: reviews[i].review,
						rating: reviews[i].rating
					})
				}
				Review.create(reviewArr, function(err, num){
					res.send({message: 'completed successful'});
				})
			})
		})
	};

	// get reviews of a user
	this.getReviews = function(req, res){
		var id = req.params.id;
		Review.find({_user: id}).deepPopulate(['_poster._intro']).exec(function(err, result){
			res.send(result);
		})
	}

}

module.exports = new Controller();