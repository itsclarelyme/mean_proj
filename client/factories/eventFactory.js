console.log("Event Factory");
app.factory('eventFactory', ['$http', function($http){

	//initializing variable
	var events = [];
	var thisevent = {};


	function eventFactory(){

		this.create_event = function(thisevent, callback){
			console.log(thisevent);
			$http.post('/event/new', thisevent).then(function(data){
				console.log(data);
				if (typeof(callback) == 'function') {
					callback(data);
				}
			})
		};

		this.get_commevents = function(comm, callback){
			$http.get('/comm/events/' + comm.id).then(function(data){
				console.log(data);
				events = data.data;
				if (typeof(callback) == 'function') {
					callback(data);
				}
			})
		};

		this.get_info = function(thisevnt, callback){
			$http.get('/event/' + thisevnt.id).then(function(data){
				console.log(data);
				thisevent = data.data;
				if (typeof(callback) == 'function') {
					callback(data);
				}
			})
		};

		this.join_part = function(part, callback){
			$http.post('/event/join', part).then(function(data){
				console.log(data);
				thisevent = data.data;
				if (typeof(callback) == 'function') {
					callback(data);
				}
			})
		};

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

}])