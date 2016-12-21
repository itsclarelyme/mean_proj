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

		this.retrieve_comm = function(callback){
			$http.get('/comm').then(function(data){
				console.log(data);
				communities = data.data;
				if (typeof(callback) == 'function') {
					callback(data);
				};
			})
		}

		this.create_comm = function(newcomm, callback){
			$http.post('/comm/new', newcomm).then(function(data){
				console.log(data);
				communities = data.data;
				if (typeof(callback) == 'function') {
					callback(data);
				};
			})
		}

		this.join_comm = function(request, callback){
			$http.post('/comm/request', request).then(function(data){
				console.log(data);
				communities = data.data;
				if (typeof(callback) == 'function') {
					callback(data);
				};
			})
		}








	}

	return new commFactory();



}])