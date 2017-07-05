var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

var entitySchema = new Schema({
    label:String,
    description:String,
    address:String,
    linkIds:[String]
});

module.exports = mongoose.model('Entity', entitySchema);