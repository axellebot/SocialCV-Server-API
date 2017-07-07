var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

var programmingLanguageSchema = new Schema({
    _id:String,
    label:String
});

module.exports = mongoose.model('ProgrammingLanguage', programmingLanguageSchema);