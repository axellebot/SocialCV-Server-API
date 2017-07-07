var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

var languageSchema = new Schema({
    _id:String,
    label:String,
    description:String
});

module.exports = mongoose.model('Language', languageSchema);