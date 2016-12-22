app.controller('mycommController', ['$scope','$location', 'commFactory', 'usersFactory', function($scope, $location, commFactory, usersFactory){

	$scope.user = {};

	// //REQUEST FOR ALL THE INFO FROM THE USER
	// var user_index = function(){
	// 	$scope.user = {"_id": "58597f88ae35afc190daf659"};
	// 	usersFactory.get_info($scope.user, function(returndate){
	// 		$scope.user = returndate;
	// 		//console.log($scope.user);
	// 	})
	// }
	// user_index();

	// //find comms that user is admin


	var get_login_session = function(user_id) {
      	usersFactory.login_index(user_id, function (data) {
      	$scope.user = data;
        
      	console.log("login - back to dash controller:");
      	console.log("login user object ");
      	console.log($scope.user)

    	}); 
  	}

  	if(usersFactory.getCookieData()){
    	console.log("cookie exists"); 
    	// calls to check if session exists 
    	get_login_session(usersFactory.getCookieData());
  	}
  	else{
  		$location.url('/');
  	}


	$scope.remove_req = function(req_comm){
		console.log(req_comm);
		$scope.rem_req={user: $scope.user._id, comm: req_comm};
		usersFactory.remove_req($scope.rem_req, function(returndate){
			console.log(returndate.config.data);
			get_login_session(usersFactory.getCookieData());
			
		})
	}

	$scope.isAdmin = function(comm){
		if(comm.admin == $scope.user._id){
			return true;
		}
		return false;
	}





}]);