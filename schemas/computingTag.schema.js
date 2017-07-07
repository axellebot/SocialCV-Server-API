var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

var computingTagSchema = new Schema({
    _id:String,
    label:String,
    icon:String
});

module.exports = mongoose.model('ComputingTag', computingTagSchema);