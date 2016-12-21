app.controller('commController', ['$scope', 'commFactory', 'usersFactory', function($scope, commFactory, usersFactory){
	//scope variable
	$scope.communities = [];
	$scope.community = {};
	//name: "Admin person", Email: 'admin@admin.com', password: 'adminadmin', ranking: 0
	$scope.user = {"_id":"58597f88ae35afc190daf659","updatedAt":"2016-12-20T18:59:20.140Z","createdAt":"2016-12-20T18:59:20.140Z","name":"Clare Lee","email":"ccc@ccc.ccc","password":"cccccc","ranking":0,"__v":0,"req_comms":[],"comms":[]};
	$scope.users = [];

	// var new_user = function(){
	// 	usersFactory.add_user($scope.user, function(returnedata){
	// 		console.log(returnedata);
	// 		$scope.users= returnedata.data;
	// 	})
	// }
	// new_user();

	//SEND REQUEST FOR USER INFO

	var user_index = function(){
		usersFactory.retrieve_user(function(returnedata){
			$scope.users = returnedata.data;
			console.log("user_index");
			console.log($scope.user);
		})
	}
	user_index();

	var comm_index = function(){
		commFactory.retrieve_comm(function(returnedata){
			$scope.communities = returnedata.data;
			console.log($scope.communities);
		})
	}
	comm_index();

	$scope.createComm = function(){
		$scope.community.admin = $scope.user;
		console.log("we are submitting this community: ");
		console.log($scope.community);
		commFactory.create_comm($scope.community, function(returnedata){
			$scope.community = {};
			console.log(returnedata);
			comm_index();
		})
	}

	$scope.join_comm = function(comm_id){
		$scope.join = {comm: comm_id, user: $scope.user._id};
		console.log($scope.join);
		commFactory.join_comm($scope.join, function(returnedata){
			console.log(returnedata);
			comm_index();
		})
	}

	$scope.isMember = function(community){
		for(var i = 0; i < community.member.length; i++){
			if(community.member[i] == $scope.user._id){
				return true;
			} 
		} 
		return false;
	}

	$scope.isRequest = function(community){
		for(var i = 0; i < community.requester.length; i++){
			if(community.requester[i] == $scope.user._id){
				return true;
			} 
		} 
		return false;
	}









}]);