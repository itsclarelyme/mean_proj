// console.log("Main dashboard controller...");
app.controller('mainController', ['$scope', 'usersFactory', '$location', function($scope, usersFactory, $location){
	//scope variable
	$scope.login_user = {};
	
	var get_login_session = function(user_id) {
      usersFactory.login_index(user_id, function (data) {
      $scope.login_user = data;
        
      // console.log("login - back to dash controller:");
      // console.log("login user object " + $scope.login_user);

    }); 
  };

  if(usersFactory.getCookieData()){
    // console.log("cookie exists");
    // calls to check if session exists 
    get_login_session(usersFactory.getCookieData());
  }
  else{
    $location.url('/login');
  }

}]);