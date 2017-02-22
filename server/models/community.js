var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var communitySchema = new mongoose.Schema ({
	comm_name : {type: String, required: true},
	location: {type: String},
	zip_code: {type: String, required: true},
	description: {type: String, default: ''},
	status: {type: String, default: 'Pending'}, // 'Pending', 'Approved', 'Rejected', 'Completed'
	events: [{type: Schema.Types.ObjectId, ref: "Event"}],
	admin: {type: Schema.Types.ObjectId, ref: "User", required: true}, 
	member: [{type: Schema.Types.ObjectId, ref: "User"}],
	requester: [{type: Schema.Types.ObjectId, ref: "User"}]},
	{timestamps: true});

var deepPopulate = require('mongoose-deep-populate')(mongoose);
communitySchema.plugin(deepPopulate, {});

mongoose.model('Community', communitySchema);