app.controller('AppController', ['$scope', 'usersFactory', function($scope, usersFactory){
    $scope.user = null;

    var get_login_session = function(user_id) {
        usersFactory.login_index(user_id, function (data) {
            $scope.user = data;
            console.log("login - back to dash controller:");
            console.log("login user object " + $scope.user);
        });
    };

    if(usersFactory.getCookieData()){
        console.log("cookie exists");
        // calls to check if session exists
        get_login_session(usersFactory.getCookieData());
    }
    else{
        console.log("user not logged in");
    }

    $scope.$on('login', function(e, user){
        $scope.user = user;
    });

    $scope.$on('logout', function(e){
        $scope.user = null
    });
}]);