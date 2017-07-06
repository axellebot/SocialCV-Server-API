var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

var computingFrameworkSchema = new Schema({
    _id:String,
    label:String,
    computingCategoryIds:[String],
    languageId:String
});

module.exports = mongoose.model('ComputingFramework', computingFrameworkSchema);