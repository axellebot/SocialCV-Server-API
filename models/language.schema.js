var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

var LanguageSchema = new Schema({
    label:String,
    description:String
},{
    timestamps: true
});

module.exports = mongoose.model('Language', LanguageSchema);