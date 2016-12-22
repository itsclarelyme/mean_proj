app.controller('eventController', ['$scope','$routeParams','$location', 'eventFactory', 'commFactory', 'usersFactory', function($scope, $routeParams, $location,eventFactory,commFactory, usersFactory){

	$scope.user = {};
	$scope.thisevent = {};
	$scope.comm = {};


	//REQUEST FOR ALL THE INFO FROM THE USER
	var user_index = function(){
		//CHANGE TO CORRESPOND TO SESSION
		$scope.user = {"_id": "58597f88ae35afc190daf659"};
		usersFactory.get_info($scope.user, function(returndata){
			$scope.user = returndata;
			//console.log($scope.user);
		})
	}
	user_index();

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


}]);