var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

var ProgrammingLanguageSchema = new Schema({
    label:String
},{
    timestamps: true
});

module.exports = mongoose.model('ProgrammingLanguage', ProgrammingLanguageSchema);