console.log("Users Factory");
app.factory('usersFactory', ['$http', '$cookies', function($http, $cookies){
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

    this.login_index = function(user_id, callback){
        console.log("login_index factory user id: " + user_id);
        $http.get('/users/'+user_id).then(function(returned_data){
        console.log("factory - login_index: " + returned_data.data._intro.first_name);
        if (typeof(callback) == 'function'){
          login_user = returned_data.data;
          console.log("assign login user ok");
          callback(login_user);
        }
        
      });

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
          if(!returned_data.data.errors){
            console.log("no error logging in..adding session");
            setCookieData(login_user._id);
          }
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


    
  // this.add_user = function(newuser, callback){
  //     $http.post('/user/new', newuser).then(function(data){
  //       console.log(data);
  //       user = data.data;
  //       if(typeof(callback) == 'function'){
  //         callback(data);
  //       }
  //     })
  //   }

  // this.retrieve_user = function(callback){
  //   $http.get('/user').then(function(data){
  //     console.log(data);
  //     users = data.data;
  //     if(typeof(callback) == 'function'){
  //       callback(data);
  //     }
  //   })
  // }

    this.add_profile = function(profile, callback){
      console.log("inside factory adding profile intro...")
      console.log(profile);
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


    this.show = function(user_id, callback){
        $http.get('/users/'+user_id).then(function(returned_data){
          console.log(returned_data.data);
          if (typeof(callback) == 'function'){
            callback(returned_data.data);
          }

        });
      };

    var setCookieData = function(id){
        console.log("inside set cookie data");
        var expired = new Date();
        expired.setDate(expired.getDate() + 1);
        $cookies.put("login_user", id, {expires : expired });
    }

    this.getCookieData = function(){
      return $cookies.get("login_user");

    }

    this.clearCookieData = function(){
      login_user = {};
      $cookies.remove("login_user");
    }
   
  }

    this.remove_req = function(doc, callback){
      $http.post('/req/remove', doc).then(function(data){
        console.log(data);
        user = data.data;
        if(typeof(callback) == 'function'){
          callback(data);
        }
      })
    }

  return new UsersFactory();


}])