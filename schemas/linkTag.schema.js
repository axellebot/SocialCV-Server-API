var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

var linkTagSchema = new Schema({
    _id:String,
    label:String,
    icon:String
});

module.exports = mongoose.model('LinkTag', linkTagSchema);