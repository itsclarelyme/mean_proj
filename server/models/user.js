var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var userSchema = new mongoose.Schema ({
	pic_url: {type: String},
	email: {type: String, required: true, unique: true}, // avoid dups
	password: {type: String, required: true}, 
	comms: [{type: Schema.Types.ObjectId, ref: "Community"}],
	req_comms: [{type: Schema.Types.ObjectId, ref: "Community"}],
	_intro: {type: Schema.Types.ObjectId, ref: "Intro"},
	role: {type: String, default: 'user'},
	ranking: {type: Number},
	salt: {type: String}},
{timestamps: true});

// bcrypt
userSchema.methods.generateHash = function(password) {
	if (this.salt && password)
    	return bcrypt.hashSync(password, this.salt);
	else
		return password;
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return this.generateHash(password) === this.password;
};

// check password match
userSchema.pre('save', function(done) {
	if (this.password && this.isModified('password')){
		this.salt = bcrypt.genSaltSync(8);
		this.password = this.generateHash(this.password);
	}
    done();
});

mongoose.model('User', userSchema);