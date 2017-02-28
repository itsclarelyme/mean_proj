console.log("Community Factory");
app.factory('commFactory', ['$http', function($http){

	//initializing variable
	var items = [];

	function commFactory(){
		// this.retrieve = function(info, callback){
		// 	$http.get('/route/' + info).then(function(data){
		// 		console.log(data);
		// 		items = data.data;
		// 		if (typeof(callback) == 'function') {
		// 			callback(data);
		// 		};
		// 	})
		// }

		// get list of communities
		this.retrieve_comm = function(query, callback){
			$http.get('/comm', query).then(function(data){
				//console.log(data);
				if (typeof(callback) == 'function') {
					callback(data);
				}
			})
		};

		// create a new comm
		this.create_comm = function(newcomm, callback){
			$http.post('/comm/new', newcomm).then(
				function(data){
					if (typeof(callback) == 'function') {
						callback(null, data);
					}
				},
				function(err){
					if (typeof(callback) == 'function') {
						callback(err);
					}
				}
			)
		};

		// request join to a comm
		this.join_comm = function(request, callback){
			$http.post('/comm/request', request).then(function(data){
				//console.log(data);
				communities = data.data;
				if (typeof(callback) == 'function') {
					callback(data);
				}
			})
		};

		// get detail info of a comm
		this.get_comminfo = function(info, callback){
			$http.get('/comm/' + info.id).then(function(data){
				//console.log(data);
				community = data.data;
				if (typeof(callback) == 'function') {
					callback(data);
				}
			})
		};

		// update comm data
		this.update_comm = function(newcomm, callback){
			$http({
				url: '/comm/' + newcomm._id,
				data: newcomm,
				method: 'PUT'
			}).then(
				function(res){
					callback(null, res);
				},
				function(err){
					callback(err);
				}
			);
		};

		// remove a comm
		this.remove_comm = function(comm, callback){
			$http({
				url: '/comm/' + comm._id,
				method: 'DELETE'
			}).then(
				function(res){
					callback(null, res);
				},
				function(err){
					callback(err);
				}
			)
		};

		// approve or reject a requested join
		this.approve_request = function(data, callback){
			$http.post('/comm/approve-request', data)
				.then(
				function(res){
					callback(null, res);
				},
				function(err){
					callback(err);
				}
			)
		}

	}

	return new commFactory();
}]);