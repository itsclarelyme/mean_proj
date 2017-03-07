app.controller('commManageController', ['$scope', '$routeParams', '$location', 'commFactory', 'usersFactory', 'toaster',
	function($scope, $routeParams, $location, commFactory, usersFactory, toaster){

	$scope.user = {};
	$scope.comm = {};
	$scope.events = [];

	var get_login_session = function(user_id) {
      	usersFactory.login_index(user_id, function (data) {
      		$scope.user = data;
    	});
  	};

  	if(usersFactory.getCookieData()){
    	get_login_session(usersFactory.getCookieData());
  	}
  	else{
  		$location.url('/');
  	}

	//REQUEST FOR ALL THE INFO FOR COMM IN URL ROUTE
	var comm_index = function(){
		commFactory.get_comminfo($routeParams, function(returndate){
			$scope.comm = returndate.data;
		})
	};
	comm_index();

	$scope.approveReq = function(requester, approved){
		// approve or reject a join request
		var data = {
			id: $scope.comm._id,
			userId: requester._id,
			approved: approved
		};
		commFactory.approve_request(data, function(err, res){
			// console.log(err);
			// console.log(res);
			if (!err){
				toaster.pop('success', 'Success', (approved ? 'Approved' : 'Rejected') + ' successfully.');
				if (approved)
					$scope.comm.member.push(requester);
				$scope.comm.requester.splice($scope.comm.requester.indexOf(requester));
			}
			else {
				toaster.pop('error', 'Error', 'Fail ' + (approved ? 'Approve' : 'Reject'));
			}
		});

	};

}]);