console.log("Event Factory");
app.factory('eventFactory', ['$http', function($http){

	//initializing variable
	var events = [];

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









	}

	return new eventFactory();



}])