console.log("Sample Factory");
app.factory('Factory', ['$http', function($http){

	//initializing variable
	var items = [];

	function Factory(){
		this.retrieve = function(info, callback){
			$http.get('/route/' + info).then(function(data){
				console.log(data);
				items = data.data;
				if (typeof(callback) == 'function') {
					callback(data);
				};
			})
		}









	}

	return new Factory();



}])