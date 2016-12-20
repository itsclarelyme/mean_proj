var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var userSchema = new mongoose.Schema ({
	name : {type: String, required: true},
	pic_url: {type: String},
	email: {type: String, required: true, unique: true}, // avoid dups
	password: {type: String, required: true}, 
	comms: [{type: Schema.Types.ObjectId, ref: "Community"}],
	_intro: {type: Schema.Types.ObjectId, ref: "Intro"},
	ranking: {type: Number}},
	{timestamps: true});

// bcrypt
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// check password match
userSchema.pre('save', function(done) {
    this.password = this.generateHash(this.password);
    done();
});

mongoose.model('User', userSchema);