var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var eventSchema = new mongoose.Schema (
	{
		title : {type: String, required: true},
		description: {type: String, required: true},
		status: {type: Boolean, default: false}, // issue resolved
		poster: {type: Schema.Types.ObjectId, ref: 'User', required:true},
		_comm: {type: Schema.Types.ObjectId, ref: "Community", required: true},
		messages: [{type: Schema.Types.ObjectId, ref: 'Message'}]
	},
	{timestamps: true}
);

var deepPopulate = require('mongoose-deep-populate')(mongoose);
eventSchema.plugin(deepPopulate, {});

mongoose.model('Event', eventSchema);