console.log("Event Factory");
app.factory('eventFactory', ['$http', function($http){

	//initializing variable
	var events = [];
	var thisevent = {};


	function eventFactory(){
		// this.retrieve = function(info, callback){
		// 	$http.get('/route/' + info).then(function(data){
		// 		console.log(data);
		// 		eventss = data.data;
		// 		if (typeof(callback) == 'function') {
		// 			callback(data);
		// 		};
		// 	})
		// }

		this.create_event = function(thisevent, callback){
			console.log(thisevent);
			$http.post('/event/new', thisevent).then(function(data){
				console.log(data);
				if (typeof(callback) == 'function') {
					callback(data);
				};
			})
		}

		this.get_commevents = function(comm, callback){
			$http.get('/comm/events/' + comm.id).then(function(data){
				console.log(data);
				events = data.data;
				if (typeof(callback) == 'function') {
					callback(data);
				};
			})
		}

		this.get_info = function(thisevnt, callback){
			$http.get('/event/' + thisevnt.id).then(function(data){
				console.log(data);
				thisevent = data.data;
				if (typeof(callback) == 'function') {
					callback(data);
				};
			})
		}









	}

	return new eventFactory();



}])