var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

var entitySchema = new Schema({
    _id:String,
    label:String,
    description:String,
    address:String,
    linkIds:[String]
});

module.exports = mongoose.model('Entity', entitySchema);