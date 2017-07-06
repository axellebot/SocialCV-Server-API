var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

var softwareSchema = new Schema({
    _id:String,
    label:String,
    description:String
});

module.exports = mongoose.model('Software', softwareSchema);