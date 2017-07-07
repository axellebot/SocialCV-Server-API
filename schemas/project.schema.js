var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({
    _id:String,
    label:String,
    description:String,
    computingTagIds:[String],
    programmingLanguageIds:[String],
    frameworkIds:[String],
    platformIds:[String],
    linkIds:[String]
});

module.exports = mongoose.model('Project', projectSchema);