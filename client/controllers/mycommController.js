
app.controller('mycommController', ['$scope', 'commFactory', 'usersFactory', '$location', function($scope, commFactory, usersFactory, $location){
    $scope.user = {};

    // //find comms that user is admin
    var get_login_session = function(user_id) {
        usersFactory.login_index(user_id, function (data) {
            $scope.user = data;
        });
    };

    if(usersFactory.getCookieData()){
        // console.log(usersFactory.getCookieData());
        get_login_session(usersFactory.getCookieData());
    }
    else{
        $location.url('/login');
    }

    var removeComm = $scope.removeComm = function(item){
        commFactory.remove_comm(item, function(err, res){
            if (!err){
                $scope.user.comms.splice($scope.user.comms.indexOf(item), 1);
            }
        })
    };

}]);