var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

var LinkSchema = new Schema({
    uri:String,
    tag:{ type: Schema.Types.ObjectId, ref: 'LinkTag' }
},{
    timestamps: true
});

module.exports = mongoose.model('Link', LinkSchema);