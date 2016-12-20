var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var introSchema = new mongoose.Schema ({
	name : {type: String, required: true},
	address: {type: String, required: true},
	phone: {type: Number},
	about: {type: String},
	occupation: {type: String},
	dob: {type: Date},
	gender: {type: String},
	comms: [{type: Schema.Types.ObjectId, ref: "Community"}]},
	{timestamps: true});
mongoose.model('Intro', introSchema);