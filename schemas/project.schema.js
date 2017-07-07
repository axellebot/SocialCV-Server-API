var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({
    _id:String,
    label:String,
    description:String,
    computingCategoryIds:[String],
    computingLanguageIds:[String],
    computingFrameworkIds:[String],
    computingPlatformIds:[String],
    linkIds:[String]
});

module.exports = mongoose.model('Project', projectSchema);