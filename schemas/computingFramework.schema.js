var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var computingFrameworkSchema = new Schema({
    label:String,
    computingCategoryIds:[String],
    languageId:String
});

module.exports = mongoose.model('ComputingFramework', computingFrameworkSchema);