var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Intro = mongoose.model('Intro'),
    Community = mongoose.model('Community')
    ;

var path = require('path'),
    multer = require('multer');

function UsersController() {
    var _this = this;
    this.index = function(req, res) {
        User.find({}).populate('_intro').exec(function(err, data) {
            res.json(data);
        });
    };

    this.index_login = function(req, res) {
        console.log("Server - index_log - param id is " + req.params.id);
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
                console.log("error pulling user to validate");
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
                console.log(user);
                console.log("wrong password");
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
    };

    this.register = function(req, res) {
        console.log("inside server - registration");
        console.log(req.body);
        req.body.role = (req.body.email == 'admin@ilendyou.com') ? 'admin' : 'user';
        User.findOne({email: req.body.email}, function(err, user){
        if (err){
            console.log("error getting user to check");
        }
        else{
            if(user == null){

                //user = new User({email: req.body.email, password: req.body.password, name: "pending"});
                user = new User(req.body);
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
    };

    this.add_profile = function(req, res) {
        console.log("inside server - upsert profile");
        var reqData = req.body;
        if (reqData._id){
            Intro.update({_id: reqData._id}, reqData, function(err){
                if (err)
                    res.json(err);
                else
                    res.json(reqData);
            })
        }
        else {
            var intro = new Intro(reqData);
            intro.save(function(err) {
                if (err){
                    res.json(err);
                    console.log("error saving new intro to user");
                }
                else{
                    User.findById({_id: reqData._user}, function(err, user){
                        if(err){
                            console.log("cannot find user to update intro");
                        }
                        else{
                            user._intro = intro._id;
                            user.save(function(err){
                                if(err){
                                    console.log("cannot update the intro on user object")
                                }
                                else{
                                    console.log("updated intro on user object successfully");
                                }
                            })
                        }
                    });
                    res.json(intro);
                }
            })
        }
    };

    this.logout = function (req, res) {
        res.redirect('/');
    };

    this.changeProfilePicture = function (req, res) {
        var upload = multer({
            dest: path.resolve('./client/images/profile_images/'), // Profile upload destination path
            limits: {
                fileSize: 1*1024*1024 // Max file size in bytes (1 MB)
            }
        }).single('newProfilePicture');
        var profileUploadFileFilter = function (req, file, cb) {
            if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/gif') {
                return cb(new Error('Only image files are allowed!'), false);
            }
            cb(null, true);
        };

        // Filtering to upload only images
        upload.fileFilter = profileUploadFileFilter;
        upload(req, res, function (uploadError) {
            if(uploadError) {
                return res.status(400).send({
                    message: 'Error occurred while uploading profile picture'
                });
            } else {
                console.log('===========================================');
                console.log(req.file.filename);
                console.log(req.body);
                var resultUrl = './images/profile_images/' + req.file.filename;
                Intro.update({_id: req.body._id}, {photo: resultUrl}, function(err){
                    res.send(resultUrl);
                });
            }
        });
    };

    this.changePassword = function(req, res){
        var reqBody = req.body;
        User.findOne({_id: reqBody._id}, function(err, user){
            if (err || !user)
                return res.status(422).send({message: 'invalid user data'});
            user.password = reqBody.password;
            user.save(function(err){
                if (err)
                    res.status(422).send(err);
                else
                    res.send({message: 'changed successfully.'});
            })
        })
    };

    this.removeUser = function(req, res){
        var id = req.body.id;
        User.findOne({_id: id}, function(err, user){
            if (err || !user)
                return res.status(422).send({message: 'invalid user data'});

            Intro.remove({_id: user._intro}, function(err){
                if (err)
                    return res.status(422).send(err);
                user.remove(function(err){
                    if (err)
                        return res.status(422).send(err);
                    res.send({message: 'removed successfully.'});
                });
            });
        })
    };

}


module.exports = new UsersController();