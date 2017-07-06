var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

var computingLanguageSchema = new Schema({
    _id:String,
    label:String
});

module.exports = mongoose.model('ComputingLanguage', computingLanguageSchema);