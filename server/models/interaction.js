var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var interactSchema = new mongoose.Schema ({
	_event: {type: Schema.Types.ObjectId, ref: 'Event', required: true},  // reference?
	_poster: {type: Schema.Types.ObjectId, ref: 'User', required: true},
	participants: [{type: Schema.Types.ObjectId}]},
	{timestamps: true});
mongoose.model('Interaction', interactSchema);