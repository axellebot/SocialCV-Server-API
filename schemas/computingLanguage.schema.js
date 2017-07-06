var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

var computingLanguageSchema = new Schema({
    label:String
});

module.exports = mongoose.model('ComputingLanguage', computingLanguageSchema);