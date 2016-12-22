var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var eventSchema = new mongoose.Schema ({
	title : {type: String, required: true},
	description: {type: String, required: true},
	status: {type: Boolean, required: true},
	poster: {type: Schema.Types.ObjectId, ref: 'User', required:true},
	participants: [{type: Schema.Types.ObjectId, ref: 'User'}],
	_comm: {type: Schema.Types.ObjectId, ref: "Community"}},
	{timestamps: true});
mongoose.model('Event', eventSchema);