/* Admin dashboard */

app.controller('AdminDashboardController', ['$scope', 'commFactory', 'usersFactory', 'toaster', function($scope, commFactory, usersFactory, toaster){
    //scope variable
    $scope.communities = [];
    $scope.community = {};
    //name: "Admin person", Email: 'admin@admin.com', password: 'adminadmin', ranking: 0
    $scope.user = {};
    $scope.users = [];
    $scope.item = null;

    var get_login_session = function(user_id, cb1, cb2) {
        // console.log('------ get user ------');
        usersFactory.login_index(user_id, function (data) {
            $scope.user = data;
            cb1(cb2);
        });
    };

     var user_index = function(next){
         // console.log('------ get users ------');
     	usersFactory.retrieve_user(function(returndata){
     		$scope.users = returndata.data;
            next();
     	})
     };

    var comm_index = function(){
        // console.log('------ get comms ------');
        commFactory.retrieve_comm({}, function(returnedata){
            // console.log(returnedata.data);
            $scope.communities = returnedata.data;
        })
    };

    var init = function(){
        // console.log('------ init ------');
        get_login_session(usersFactory.getCookieData(), user_index , comm_index);
    };

    var approveComm = function(item, approved){
        // ------------ approve or reject a requested community
        var reqItem = angular.copy(item);
        reqItem.status = approved ? 'Approved' : 'Rejected';
        commFactory.update_comm(reqItem, function(err, res){
            if (err){
                // console.log(err);
            }
            else {
                // console.log(res);
                item.status = reqItem.status;
            }
        })
    };

    var removeComm = function(item){
        // ---------------- remove a community -----------------
        commFactory.remove_comm(item, function(err, res){
            if (!err){
                $scope.communities.splice($scope.communities.indexOf(item), 1);
            }
        })
    };

    var removeUser = function(item){
        // -------------- remove a user ------------------
        usersFactory.remove_user(item._id, function(err, res){
            if (err){
                // console.log(err);
                toaster.pop('error', 'Error', 'Fail remove user.');
            }
            else {
                toaster.pop('success', 'Success', 'Removed user, successfully.');
                user_index(comm_index);
            }
        })
    };

    $scope.curTab = 1;
    $scope.changeTab = function(num){
        $scope.curTab = num;
    };

    $scope.openModal = function(item){
        $scope.item = item;
        $('#myModal').modal('show');
    };

    $scope.openIntroModal = function(client){
        $scope.detailUser = client;
        $('#introModal').modal('show');
    };

    $scope.init = init;
    $scope.approveComm = approveComm;
    $scope.removeComm = removeComm;
    $scope.removeUser = removeUser;

}]);