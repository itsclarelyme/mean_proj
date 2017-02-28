console.log("Users Factory");
app.factory('usersFactory', ['$http', '$cookies', function($http, $cookies){
	//initializing variable
  var login_user = {};
  var users = [];
  

  function UsersFactory(){

    var _this = this;
    
    this.index = function(callback){

      // get list of users
      $http.get('/users').then(function(returned_data){
        console.log(returned_data);
        if (typeof(callback) == 'function'){
          users = returned_data.data;
          callback(users);
        }
      });
    };

    // get detail info of a user
    this.login_index = function(user_id, callback){
        $http.get('/users/'+user_id).then(function(returned_data){
        if (typeof(callback) == 'function'){
          login_user = returned_data.data;
          callback(login_user);
        }
      });
    };


    // sign up a user
    this.register = function(newuser, callback){
      $http.post('/register', newuser).then(function(returned_data){
        if (typeof(callback) == 'function'){
          login_user = returned_data.data;
          callback(returned_data.data);
        }
      });
    };

    // sign in
    this.login = function(user, callback){
      $http.post('/login', user).then(function(returned_data){
        if (typeof(callback) == 'function'){
          login_user = returned_data.data;
          if(!returned_data.data.errors){
            setCookieData(login_user._id);
          }
          callback(returned_data.data);
        }
      });
    };

    // get detail info of a user
    this.get_info = function(user, callback){
      $http.get('/user/' + user._id).then(function(returned_data){
        user = returned_data.data;
        if(typeof(callback) == 'function'){
          callback(user);
        }
      })
    };

    // create a new user
    this.add_user = function(newuser, callback){
        $http.post('/user/new', newuser).then(function(data){
          console.log(data);
          user = data.data;
          if(typeof(callback) == 'function'){
            callback(data);
          }
        })
      };

    // get users
    this.retrieve_user = function(callback){
      $http.get('/user').then(function(data){
        console.log(data);
        users = data.data;
        if(typeof(callback) == 'function'){
          callback(data);
        }
      })
    };

    // update profile of a user
    this.add_profile = function(profile, callback){
      $http.post('/profile', profile).then(function(returned_data){
        console.log("back to users factory..");
        console.log(returned_data.data);
        if (typeof(callback) == 'function'){
          login_user = returned_data.data;
          if(!returned_data.data.errors){
            console.log("no error creating user..adding session");
            setCookieData(login_user._user);
          }
          callback(returned_data.data);
        }

      });
    };

    // change password
    this.change_password = function(data, callback){
      $http.post('/api/users/change-password', data).then(
          function(res){
            callback(null, res);
          },
          function(err){
            callback(err);
          }
      )
    };

    this.show = function(user_id, callback){
        $http.get('/users/'+user_id).then(function(returned_data){
          console.log(returned_data.data);
          if (typeof(callback) == 'function'){
            callback(returned_data.data);
          }

        });
      };

    // save user info to cookie
    var setCookieData = function(id){
        console.log("inside set cookie data");
        var expired = new Date();
        expired.setDate(expired.getDate() + 1);
        $cookies.put("login_user", id, {expires : expired });
    };

    // get user info from cookie
    this.getCookieData = function(){
      return $cookies.get("login_user");
    };

    // clear cookie data
    this.clearCookieData = function(){
      login_user = {};
      $cookies.remove("login_user");
    };


    // remove a ago join request
    this.remove_req = function(doc, callback){
      $http.post('/req/remove', doc).then(function(data){
        console.log(data);
        //user = data.data;
        if(typeof(callback) == 'function'){
          callback(data);
        }
      })
    };

    // remove a user
    this.remove_user = function(id, callback){
      $http.post('/api/users/delete-user', {id: id}).then(
          function(res){
            callback(null, res);
          },
          function(err){
            callback(err);
          }
      )
    }
  }


  return new UsersFactory();
}]);