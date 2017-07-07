var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

var frameworkSchema = new Schema({
    _id:String,
    label:String,
    computingCategoryIds:[String],
    languageId:String
});

module.exports = mongoose.model('Framework', frameworkSchema);