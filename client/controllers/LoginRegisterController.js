app.controller('LoginController', ['$scope', 'usersFactory', '$location','$routeParams', function($scope, usersFactory, $location, $routeParams){
	//scope variable
	$scope.errors = {};
	//$scope.user = {};
	$scope.registration = {};
	$scope.userLogin = {};

	$scope.logout = $routeParams.id;

	$scope.register = function(){
        usersFactory.register($scope.registration, function(data){
    		// console.log("register controller");
	      	if (data.errors){
	        	$scope.errors = data.errors;
	     	}
	      	else{
	        	$scope.user = data;
	        	$scope.registration = {};
				$scope.$emit('login', data);
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
	          // console.log("login data:");
	          // console.log(data);
              $scope.userLogin = {};
				$scope.$emit('login', data);
              $location.url('/mycomm');
	        }
      	})
  	};



}]);


app.controller('IntroController', ['$scope', 'usersFactory', '$location', '$routeParams', '$timeout', 'Upload', 'toaster', function($scope, usersFactory, $location, $routeParams, $timeout, Upload, toaster){
	//scope variable
	var user_id = $routeParams.id;
	if (!user_id)
		return $location.url('/comms/');

	$scope.stateArr = [
		"Alabama",
		"Alaska",
		'Arizona',
		'Arkansas',
		'California',
		'Colorado',
		'Connecticut',
		'Delaware',
		'Florida',
		'Georgia',
		'Hawaii',
		'Idaho',
		'Illinois',
		'Indiana',
		'Iowa',
		'Kansas',
		'Kentucky',
		'Louisiana',
		'Maine',
		'Maryland',
		'Massachusetts',
		'Michigan',
		'Minnesota',
		'Mississippi',
		'Missouri',
		'Montana',
		'Nebraska',
		'Nevada',
		'New Hampshire',
		'New Jersey',
		'New Mexico',
		'New York',
		'North Carolina',
		'North Dakota',
		'Ohio',
		'Oklahoma',
		'Oregon',
		'Pennsylvania',
		'Rhode Island',
		'South Carolina',
		'South Dakota',
		'Tennessee',
		'Texas',
		'Utah',
		'Vermont',
		'Virginia',
		'Washington',
		'West Virginia',
		'Wisconsin',
		'Wyoming'
	];

	var vm = $scope.vm = {};
	vm.progress = 0;
	vm.photoUrl = './images/profile_images/default_pic.png';

	usersFactory.login_index(user_id, function (data) {
		$scope.user = data;
		$scope.profile = angular.copy($scope.user._intro);
		vm.photoUrl = angular.copy($scope.profile.photo);
	});

	$scope.submit_profile = function(){
		// submit profile
		$scope.profile._user = user_id;
        usersFactory.add_profile($scope.profile, function(data){
    		// console.log("intro controller");
	      	if (data.errors){
	        	$scope.errors = data.errors;
	     	}
	      	else{
	        	$location.url('/mycomm');
	      	}
    	})
  	};


	vm.upload = function (dataUrl) {
		// upload profile image
		Upload.upload({
			url: '/api/users/picture',
			data: {
				newProfilePicture: dataUrl,
				_id: $scope.user._intro._id
			}
		}).then(function (response) {
			$timeout(function () {
				onSuccessItem(response.data);
			});
		}, function (response) {
			if (response.status > 0) onErrorItem(response.data);
		}, function (evt) {
			vm.progress = parseInt(100.0 * evt.loaded / evt.total, 10);
		});
	};

	// Called after the user has successfully uploaded a new picture
	function onSuccessItem(response) {
		vm.photoUrl = response;
		$scope.profile.photo = vm.photoUrl;
		vm.fileSelected = false;
		vm.progress = 0;
	}

	// Called after the user has failed to upload a new picture
	function onErrorItem(response) {
		// console.log(response);
		vm.fileSelected = false;
		vm.progress = 0;
	}

	$scope.tab = 1;

	$scope.setTab = function(newTab){
		// change tab
		if ($scope.tab == 1 && !$scope.user._intro)
			return false;
		if ($scope.tab == 2 &&  !$scope.profile.photo)
			return false;
		$scope.tab = newTab;
	};

	$scope.isSet = function(tabNum){
		return $scope.tab === tabNum;
	};

	$scope.registration = {};
	$scope.change_password = function(){
		// change password
		var reqData = {
			_id: $scope.user._id,
			password: $scope.registration.password
		};
		usersFactory.change_password(reqData, function(err, res){
			if (err)
				toaster.pop('error', 'Error', 'Fail update password.');
			else
				toaster.pop('success', 'Success', 'Updated successfully.');
		});
	}
}]);


app.controller('LogoutController', ['$scope', 'usersFactory', '$location', function($scope, usersFactory, $location){
	//scope variable
	$scope.login_user = {};
	$scope.logout = "false";
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
    usersFactory.clearCookieData();
    $scope.logout = "true";
    // console.log("TRYING TO LOGOUT...");
	  $scope.$emit('logout', {});
    $location.url('/comms/');

  }

}]);




