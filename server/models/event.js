var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var eventSchema = new mongoose.Schema ({
	title : {type: String, required: true},
	description: {type: String, required: true}},
	{timestamps: true});
mongoose.model('Event', eventSchema);