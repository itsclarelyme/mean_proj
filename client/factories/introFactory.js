console.log("Intro Factory");
app.factory('introFactory', ['$http', function($http){

	//initializing variable
	var intros = [];

	function introFactory(){
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

	return new introFactory();



}])