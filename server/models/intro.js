var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var introSchema = new mongoose.Schema ({
	first_name : {type: String, required: true},
	last_name : {type: String, required: true},
	street: {type: String, required: true},
	state: {type: String, required: true},
	city: {type: String, required: true},
	zipcode: {type: String, required: true},
	country: {type: String, required: true},
	phone: {type: String},
	about: {type: String},
	occupation: {type: String},
	age: {type: Number},
	gender: {type: String},
	_user: {type: Schema.Types.ObjectId, ref: 'User', required: true}},
	{timestamps: true});
mongoose.model('Intro', introSchema);