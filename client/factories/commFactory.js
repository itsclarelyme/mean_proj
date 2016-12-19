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









	}

	return new commFactory();



}])