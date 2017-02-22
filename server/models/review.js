var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var reviewSchema = new mongoose.Schema (
    {
        _event: {type: Schema.Types.ObjectId, ref: 'Event', required:true},
        _poster: {type: Schema.Types.ObjectId, ref: 'User', required:true},
        _user: {type: Schema.Types.ObjectId, ref: 'User', required:true},
        review: {type: String, required: true},
        rating: {type: Number, default: 0}
    },
    {timestamps: true}
);

var deepPopulate = require('mongoose-deep-populate')(mongoose);
reviewSchema.plugin(deepPopulate, {});

mongoose.model('Review', reviewSchema);