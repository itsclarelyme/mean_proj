console.log("interactions Factory");
app.factory('interFactory', ['$http', function($http){

	//initializing variable
	var interactions = [];

	function interFactory(){
		// this.retrieve = function(info, callback){
		// 	$http.get('/route/' + info).then(function(data){
		// 		console.log(data);
		// 		items = data.data;
		// 		if (typeof(callback) == 'function') {
		// 			callback(data);
		// 		};
		// 	})
		// }









	}

	return new interFactory();



}])