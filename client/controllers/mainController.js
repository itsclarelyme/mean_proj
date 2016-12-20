console.log("Main dashboard controller...");
app.controller('mainController', ['$scope', 'usersFactory', function($scope, usersFactory){
	//scope variable
	$scope.login_user = {};
	
	var login_userIndex = function() {
      usersFactory.login_index(function (data) {
        $scope.login_user = data;
        console.log("login - back to dash controller:");
        console.log("login user id is " + $scope.login_user._id);
    }); 
  }

login_userIndex();


}]);