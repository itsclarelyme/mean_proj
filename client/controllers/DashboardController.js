app.controller('DashboardController', ['$scope', '$location', 'commFactory', 'usersFactory', function($scope, $location, commFactory, usersFactory){
    $scope.user = {};

    // //find comms that user is admin
    var get_login_session = function(user_id) {
        usersFactory.login_index(user_id, function (data) {
            $scope.user = data;
        });
    };

    if(usersFactory.getCookieData()){
        get_login_session(usersFactory.getCookieData());
    }
    else{
        $location.url('/login');
    }

    $scope.remove_req = function(req_comm){
        // console.log(req_comm);
        $scope.rem_req={user: $scope.user._id, comm: req_comm};
        usersFactory.remove_req($scope.rem_req, function(returndata){
            // console.log(returndata.config.data);
            get_login_session(usersFactory.getCookieData());
        })
    };

}]);