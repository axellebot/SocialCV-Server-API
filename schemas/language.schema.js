var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var languageSchema = new Schema({
    label:String,
    description:String
});

module.exports = mongoose.model('Language', languageSchema);