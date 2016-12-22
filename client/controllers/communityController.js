app.controller('communityController', ['$scope','$routeParams','$location', 'commFactory', 'usersFactory','eventFactory', function($scope, $routeParams, $location, commFactory, usersFactory, eventFactory){

	$scope.user = {};
	$scope.comm = {};
	$scope.events = [];
	$scope.comm = {};

	
	var get_login_session = function(user_id) {
      	usersFactory.login_index(user_id, function (data) {
      	$scope.user = data;
        
      	console.log("login - back to dash controller:");
      	console.log("login user object " + $scope.user);

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

	//REQUEST FOR ALL THE INFO FOR COMM IN URL ROUTE
	var comm_index = function(){
		//CHANGE TO CORRESPOND TO SESSION
		//$scope.comm = {"_id": $routeParams.id};
		//console.log($routeParams);
		commFactory.get_comminfo($routeParams, function(returndate){
			$scope.comm = returndate.data;
			//console.log($scope.comm);
		})
	}
	comm_index();

	//GET ALL EVENTS FOR COMM
	var events_index = function(){
		eventFactory.get_commevents($routeParams, function(returndate){
			$scope.events = returndate.data;
			console.log($scope.events);
		})
	}
	events_index();

	//check if user is a member
	$scope.isMember = function(comm){
		//console.log(comm);
		for(var i = 0; i < comm.length; i++){
			//console.log(i + " iter: " + comm[i]._id == $scope.user._id);
			if(comm[i]._id == $scope.user._id){
				return true;
			} 
		} 
		return false;
	}

	//find comms that user is admin
	$scope.isAdmin = function(admin){
		//console.log($scope.user._id == admin._id);
		if($scope.user._id == admin._id){
			return true;
		}
		return false;
	}








}]);