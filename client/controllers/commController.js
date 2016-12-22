app.controller('commController', ['$scope', 'commFactory', 'usersFactory', function($scope, commFactory, usersFactory){
	//scope variable
	$scope.communities = [];
	$scope.community = {};
	//name: "Admin person", Email: 'admin@admin.com', password: 'adminadmin', ranking: 0
	$scope.user = {};
	$scope.users = [];

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
  		console.log("user not logged in"); 
  	}

	// var user_index = function(){
	// 	usersFactory.retrieve_user(function(returnedata){
	// 		$scope.users = returnedata.data;
	// 		console.log("user_index");
	// 		console.log($scope.user);
	// 	})
	// }
	// user_index();

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
			if(community.member[i]._id == $scope.user._id){
				return true;
			} 
		} 
		return false;
	}

	$scope.isRequest = function(community){
		for(var i = 0; i < community.requester.length; i++){
			if(community.requester[i]._id == $scope.user._id){
				return true;
			} 
		} 
		return false;
	}









}]);