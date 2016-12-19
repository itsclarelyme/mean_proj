var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var userSchema = new mongoose.Schema ({
	name : {type: String, required: true},
	pic_url: {type: String},
	email: {type: String, required: true},
	password: {type: String, required: true}, 
	_intro: {type: Schema.Types.ObjectId, ref: "Intro"},
	ranking: {type: Number}},
	{timestamps: true});
mongoose.model('User', userSchema);