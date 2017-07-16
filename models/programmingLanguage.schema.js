var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

const uuid = require("../helpers").uuid;

var ProgrammingLanguageSchema = new Schema({
    _id: {type: String, default: uuid},
    label:String
},{
    timestamps: true
});

module.exports = mongoose.model('ProgrammingLanguage', ProgrammingLanguageSchema);