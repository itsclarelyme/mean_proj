var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var interactSchema = new mongoose.Schema ({
	_event: {type: Schema.Types.ObjectId, required: true},
	_poster: {type: Schema.Types.ObjectId, required: true},
	participants: [{type: Schema.Types.ObjectId}]},
	{timestamps: true});
mongoose.model('Interaction', interactSchema);