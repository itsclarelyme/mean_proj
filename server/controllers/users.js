var mongoose = require('mongoose'),
User = mongoose.model('User');
Intro = mongoose.model('Intro');

function UsersController() {
    var _this = this;
    this.index = function(req, res) {
        User.find({}).populate('_intro').exec(function(err, data) {
            res.json(data);
        });
    };

    this.index_login = function(req, res) {
        console.log("Server - index_log - param id is " + req.params.id)
        User.findById({_id: req.params.id}).populate('_intro').populate('req_comms').populate('comms').exec(function(err, data) {
            if (err){
                res.json(err);
            }
            else{
                console.log("found login user");
                res.json(data);
            }
        });
    };

    this.login = function(req, res) {
        console.log("Inside Server - login");
        console.log(req.body);
        User.findOne({
            email: req.body.email
        }, function(err, user) {
            if (err) {
                res.json({
                        errors: {
                            login_reg: {
                                message: "User name and/or password is invalid",
                                kind: "what didn't work",
                                path: "User",
                                value: "cause of the initial error"
                            }
                        },
                        name: "Validation error"
                });

            } else if (user && user.validPassword(req.body.password)) {
                res.json(user);

            } 
            else {
                res.json({
                        errors: {
                            login_reg: {
                                message: "User name and/or password is invalid",
                                kind: "what didn't work",
                                path: "User",
                                value: "cause of the initial error"
                            }
                        },
                        name: "Validation error"
                 });
            }
        })
    }
    this.register = function(req, res) {
        console.log("inside server - registration");
        console.log(req.body);

        User.findOne({email: req.body.email}, function(err, user){
        if (err){
            console.log("error getting user to check");
        }
        else{
            if(user == null){

                user = new User({email: req.body.email, password: req.body.password, name: "pending"});
                console.log(user);

                user.save(function(err, newuser) {
                    if (err){
                        res.json(err);
                        console.log("error saving new user");
                    }
                    else{
                        res.json(newuser);
                    }
                });

            }
            else{
                console.log("user already exists...");
                res.json({
                        errors: {
                            login_reg: {
                                message: "User name already exists/taken. Please Login instead",
                                kind: "what didn't work",
                                path: "User",
                                value: "cause of the initial error"
                            }
                        },
                        name: "Validation error"
                 });
            }
        }
        })
    }

    this.add_profile = function(req, res) {
        console.log("inside server - adding profile");
        console.log(req.body);

        intro = new Intro(req.body);

        intro.save(function(err, intro) {
            if (err){
                res.json(err);
                console.log("error saving new intro to user");
            }
            else{
                User.findById({_id: req.body._user}, function(err, user){
                    if(err){
                        console.log("cannot find user to update intro");
                    }
                    else{
                        User.update({_id: user._id}, {_intro: intro._id}, function(err, user){
                            if(err){
                                console.log("cannot update the intro on user object")
                            }
                            else{
                                console.log("updated intro on user object successfully");
                            }
                        })
                    }
                })


                res.json(intro);
            }
        })

    }

}


module.exports = new UsersController();