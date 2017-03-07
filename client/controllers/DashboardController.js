app.controller('DashboardController', ['$scope', '$location', 'commFactory', 'usersFactory', 'toaster', function($scope, $location, commFactory, usersFactory, toaster){
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
        // remove a ago join request
        // console.log(req_comm);
        $scope.rem_req={user: $scope.user._id, comm: req_comm};
        usersFactory.remove_req($scope.rem_req, function(returndata){
            // console.log(returndata.config.data);
            get_login_session(usersFactory.getCookieData());
        })
    };

    $scope.open_edit_modal = function(item){
        $scope.item = angular.copy(item);
        $('#editModal').modal('show');
    };

    $scope.update_comm = function(){
        console.log($scope.item);
        commFactory.update_comm($scope.item, function(err, res){
            if (!err){
                get_login_session(usersFactory.getCookieData());
                toaster.pop('success', 'Success', 'Successfully updated.');
            }
            else {
                toaster.pop('error', 'Error', 'Fail update.');
            }
            $('#editModal').modal('hide');
        })
    }

}]);