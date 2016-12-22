app.controller('evntdetailController', ['$scope','$routeParams','$location', 'eventFactory', 'commFactory', 'usersFactory', function($scope, $routeParams, $location,eventFactory,commFactory, usersFactory){

	$scope.user = {};
	$scope.thisevent = {};
	$scope.comm = {};
	$scope.part={};
	$scope.message = {};

	
	var get_login_session = function(user_id) {
      	usersFactory.login_index(user_id, function (data) {
      	$scope.login_user = data;
        
      	console.log("login - back to dash controller:");
      	console.log("login user object " + $scope.login_user);

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

	//find the event detail from the routeparams
	var event_index = function(){
		eventFactory.get_info($routeParams, function(returndata){
			$scope.thisevent = returndata.data;
			console.log($scope.thisevent);
		})
	}
	event_index();

	//GET ALL MSG FROM THIS EVENT
	var msg_index = function(){
		// eventFactory.get_msg($scope.thisevent, function(returndata){

		// })
	}


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


	//create new event
	$scope.newevent = function(){
		$scope.thisevent.poster = $scope.user;
		$scope.thisevent._comm = $scope.comm;
		$scope.thisevent.status = false;
		console.log($scope.thisevent);
		console.log($routeParams.id);
		eventFactory.create_event($scope.thisevent, function(returndata){

			$location.url('/comm/' + $scope.comm._id);
		})
	}

	$scope.isPoster = function(){
		if($scope.thisevent.poster._id == $scope.user._id){
			return true;
		}
		return false;
	}

	$scope.isPart = function(){
		for(var i=0; i< $scope.thisevent.participants.length; i++){
			if($scope.thisevent.participants[i]._id == $scope.user._id){
				return true;				
			}
		}
		return false;
	}

	$scope.join_part = function(){
		//push user into this event participant
		$scope.part.user = $scope.user._id;
		$scope.part.thisevent = $scope.thisevent._id;
		eventFactory.join_part($scope.part, function(returndata){
			$scope.thisevent = returndata.data;
			$scope.part = {};
		})
	}

	$scope.add_msg = function(){
		$scope.message.author = $scope.user;
		$scope.amessage._event = $scope.thisevent;
		eventFactory.add_msg($scope.message, function(returndata){
			$scope.thisevent = returndata.data;
			$scope.message = {};
		})
	}




}]);