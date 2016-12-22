app.controller('mycommController', ['$scope', 'commFactory', 'usersFactory', function($scope, commFactory, usersFactory){

	$scope.user = {};

	//REQUEST FOR ALL THE INFO FROM THE USER
	var user_index = function(){
		$scope.user = {"_id": "58597f88ae35afc190daf659"};
		usersFactory.get_info($scope.user, function(returndate){
			$scope.user = returndate;
			//console.log($scope.user);
		})
	}
	user_index();

	//find comms that user is admin


	$scope.remove_req = function(req_comm){
		$scope.remove_req={user: $scope.user._id, comm: req_comm};
		usersFactory.remove_req($scope.remove_req, function(returndate){
			console.log(returndate);
			user_index();
		})
	}

	$scope.isAdmin = function(comm){
		if(comm.admin == $scope.user._id){
			return true;
		}
		return false;
	}





}]);