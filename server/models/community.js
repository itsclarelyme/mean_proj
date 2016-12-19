var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var communitySchema = new mongoose.Schema ({
	name : {type: String, required: true},
	location: {type: String, required: true}},
	{timestamps: true});

mongoose.model('Community', communitySchema);