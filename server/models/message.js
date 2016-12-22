var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var messageSchema = new mongoose.Schema ({
	msg: {type: String, required: true},
	_event: {type: Schema.Types.ObjectId, ref: "Event", required: true},
	_author: {type: Schema.Types.ObjectId, ref: "User", required: true}},
	{timestamps: true});
mongoose.model('Message', messageSchema);