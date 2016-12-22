app.controller('LoginController', ['$scope', 'usersFactory', '$location', function($scope, usersFactory, $location){
	//scope variable
	$scope.errors = {};
	$scope.user = {};
	$scope.registration = {};
	$scope.userLogin = {};

	$scope.register = function(){
        usersFactory.register($scope.registration, function(data){
    		console.log("register controller");
	      	if (data.errors){
	        	$scope.errors = data.errors;
	     	}
	      	else{
	        	$scope.user = data;
	        	$scope.registration = {};
	        	$location.url('/introduction/'+ $scope.user._id);
	        	
	      	}
    	})
  	};

  	$scope.login = function(){
    	usersFactory.login($scope.userLogin, function(data){
        if (data.errors){
	          $scope.errors = data.errors;
	        }
	        else{
	          $scope.user = data;
	          console.log("login data:");
	          console.log(data);
              $scope.userLogin = {};
              $location.url('/');
	        }
      	})
  	};

}]);


app.controller('IntroController', ['$scope', 'usersFactory', '$location', '$routeParams', function($scope, usersFactory, $location, $routeParams){
	//scope variable
	$scope.user = {};
	$scope.profile = {};

	$scope.submit_profile = function(){
		$scope.profile._user = $routeParams.id;
		console.log($scope.profile);
        usersFactory.add_profile($scope.profile, function(data){
    		console.log("intro controller");
	      	if (data.errors){
	        	$scope.errors = data.errors;
	     	}
	      	else{
	        	$scope.user = data.data;
	        	console.log(data);
	        	$scope.profile = {};
	        	$location.url('/');
	      	}
    	})
  	};


}]);


app.controller('LogoutController', ['$scope', 'usersFactory', '$location', function($scope, usersFactory, $location){
	//scope variable
	$scope.login_user = {};
	$scope.logout = false;
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
    usersFactory.clearCookieData();
    $scope.logout = true;
  }
	console.log("logout controller");
	

}]);




