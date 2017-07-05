var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var computingProjectSchema = new Schema({
    label:String,
    description:String,
    computingCategoryIds:[String],
    computingLanguageIds:[String],
    computingFrameworkIds:[String],
    computingPlatformIds:[String],
    linkIds:[String]
});

module.exports = mongoose.model('ComputingProject', computingProjectSchema);