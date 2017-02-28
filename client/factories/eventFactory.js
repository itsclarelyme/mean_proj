console.log("Event Factory");
app.factory('eventFactory', ['$http', function($http){

	//initializing variable
	var events = [];
	var thisevent = {};


	function eventFactory(){

		// create a new event
		this.create_event = function(thisevent, callback){
			console.log(thisevent);
			$http.post('/event/new', thisevent).then(function(data){
				console.log(data);
				if (typeof(callback) == 'function') {
					callback(data);
				}
			})
		};

		// get events of a comm
		this.get_commevents = function(comm, callback){
			$http.get('/comm/events/' + comm.id).then(function(data){
				console.log(data);
				events = data.data;
				if (typeof(callback) == 'function') {
					callback(data);
				}
			})
		};

		// get detail info of a event
		this.get_info = function(thisevnt, callback){
			$http.get('/event/' + thisevnt.id).then(function(data){
				console.log(data);
				thisevent = data.data;
				if (typeof(callback) == 'function') {
					callback(data);
				}
			})
		};

		// join to a event
		this.join_part = function(part, callback){
			$http.post('/event/join', part).then(function(data){
				console.log(data);
				thisevent = data.data;
				if (typeof(callback) == 'function') {
					callback(data);
				}
			})
		};

		// get messages of a event
		this.get_msg = function(evnt, callback){
			console.log("events factory padding with id: ");
			console.log(evnt);
			$http.get('/msg/' + evnt._id).then(function(data){
				console.log(data);
				if (typeof(callback) == 'function') {
					callback(data);
				}
			})
		};

		// add a message to a event
		this.add_msg = function(msg, callback){
			$http.post('/msg/new', msg).then(
				function(data){
					if (typeof(callback) == 'function') {
						callback(null, data.data);
					}
				},
				function(err){
					if (typeof (callback) == 'function'){
						callback(err);
					}
				}
			)
		};

		// complete a event
		this.complete_event = function(data, callback){
			$http.post('/event/complete', data).then(
				function(res){
					if (typeof (callback) == 'function')
						callback(null, res.data);
				},
				function(err){
					if (typeof (callback) == 'function')
						callback(err);
				}
			)
		};

		// get reviews of a uesr
		this.get_reviews = function(userId, callback){
			$http.get('/api/users/get-reviews/' + userId).then(
				function(res){
					callback(null, res);
				},
				function(err){
					callback(err);
				}
			)
		}
	}

	return new eventFactory();

}]);