var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var introSchema = new mongoose.Schema ({
	name : {type: String, required: true},
	location: {type: String, required: true},
	admin: {type: Schema.Types.ObjectId, ref: "User", required: true}, 
	member: [{type: Schema.Types.ObjectId, ref: "User"}],
	request: [{type: Schema.Types.ObjectId, ref: "User"}]},
	{timestamps: true});
mongoose.model('Intro', introSchema);