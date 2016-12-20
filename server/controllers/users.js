var mongoose = require('mongoose'),
User = mongoose.model('User');

function UsersController() {
    var _this = this;
    this.index = function(req, res) {
        User.find({}, function(err, data) {
            res.json(data);
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
                                path: "reference to the schema's name",
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
                                path: "reference to the schema's name",
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
                                path: "reference to the schema's name",
                                value: "cause of the initial error"
                            }
                        },
                        name: "Validation error"
                 });
            }
        }
        })
    }


}



module.exports = new UsersController();