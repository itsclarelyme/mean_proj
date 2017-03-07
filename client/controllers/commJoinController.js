app.controller('commJoinController', ['$scope','$routeParams','$location', 'commFactory', 'usersFactory','eventFactory', function($scope, $routeParams, $location, commFactory, usersFactory, eventFactory){

    $scope.user = {};
    $scope.comm = {};
    $scope.events = [];

    var get_login_session = function(user_id) {
        usersFactory.login_index(user_id, function (data) {
            $scope.user = data;
        });
    };

    if(usersFactory.getCookieData()){
        // calls to check if session exists
        get_login_session(usersFactory.getCookieData());
    }
    else{
        $location.url('/');
    }

    //REQUEST FOR ALL THE INFO FOR COMM IN URL ROUTE
    var comm_index = function(){
        //CHANGE TO CORRESPOND TO SESSION
        //$scope.comm = {"_id": $routeParams.id};
        //console.log($routeParams);
        commFactory.get_comminfo($routeParams, function(returndate){
            $scope.comm = returndate.data;
        })
    };
    comm_index();

    //check if user is a member
    $scope.isMember = function(comm){
        //console.log(comm);
        if (!comm)
            return false;
        for(var i = 0; i < comm.length; i++){
            if(comm[i]._id == $scope.user._id){
                return true;
            }
        }
        return false;
    };

    //check if user is a requester
    $scope.isReq = function(reqt){
        if (!reqt)
            return false;
        //console.log(comm);
        for(var i = 0; i < reqt.length; i++){
            // console.log(i + " iter: " + reqt[i]._id == $scope.user._id);
            if(reqt[i]._id == $scope.user._id){
                return true;
            }
        }
        return false;
    };

    //find comms that user is admin
    $scope.isAdmin = function(admin){
        if (!admin)
            return false;
        if($scope.user._id == admin._id){
            return true;
        }
        return false;
    };

}]);