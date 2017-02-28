console.log("Users Factory");
app.factory('usersFactory', ['$http', function($http){
	//initializing variable
  var login_user = {};
  var users = [];

  function UsersFactory(){

    var _this = this;
    this.index = function(callback){
      $http.get('/users').then(function(returned_data){
        console.log(returned_data);
        if (typeof(callback) == 'function'){
          users = returned_data.data;
          callback(users);
        }
        
      });

    };

    this.login_index = function(callback){
        if (typeof(callback) == 'function'){
          callback(login_user);
        }

    };


    this.register = function(newuser, callback){
      console.log("inside factory registering user...")
      console.log(newuser);
      $http.post('/register', newuser).then(function(returned_data){
        console.log("back to users factory..");
        console.log(returned_data.data);
        if (typeof(callback) == 'function'){
          login_user = returned_data.data;
          callback(returned_data.data);
        }

      });
    };

    this.login = function(user, callback){
      console.log("inside factory login user...")
      console.log(user);
      $http.post('/login', user).then(function(returned_data){
        console.log("back to users factory..");
        console.log(returned_data.data);
        if (typeof(callback) == 'function'){
          login_user = returned_data.data;
          callback(returned_data.data);
        }

      });
    };

    // this.get_info = function(user, callback){
    //   $http.get('/user/' + user._id).then(function(returned_data){
    //     console.log("factory get all user info");
    //     //console.log(returned_data);
    //     user = returned_data.data;
    //     if(typeof(callback) == 'function'){
    //       callback(user);
    //     }
    //   })
    // }

    this.show = function(user_id, callback){
        $http.post('/user/info', user).then(function(returned_data){
          console.log(returned_data.data);
          if (typeof(callback) == 'function'){
            callback(returned_data.data);
          }

        });
      };
   
  

    this.add_user = function(newuser, callback){
        $http.post('/user/new', newuser).then(function(data){
          console.log(data);
          user = data.data;
          if(typeof(callback) == 'function'){
            callback(data);
          }
        })
      };

    this.retrieve_user = function(callback){
      $http.get('/user').then(function(data){
        console.log(data);
        users = data.data;
        if(typeof(callback) == 'function'){
          callback(data);
        }
      })
    };

    this.remove_req = function(doc, callback){
      $http.post('/req/remove', doc).then(function(data){
        console.log(data);
        user = data.data;
        if(typeof(callback) == 'function'){
          callback(data);
        }
      })
    }
  }

  return new UsersFactory();

}]);