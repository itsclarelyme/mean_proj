console.log("User Factory");
app.factory('userFactory', ['$http', function($http){

	//initializing variable
	var user = {};
	var users = [];

	function userFactory(){
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

	return new userFactory();



}])