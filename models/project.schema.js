var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    label: String,
    description: String,
    projectTag: {type: Schema.Types.ObjectId, ref: 'ProjectTag'},
    programmingLanguages: [{type: Schema.Types.ObjectId, ref: 'ProgrammingLanguage'}],
    frameworks: [{type: Schema.Types.ObjectId, ref: 'Framework'}],
    softwareFrameworks: [{type: Schema.Types.ObjectId, ref: 'SoftwareFrameworks'}],
    links: [{type: Schema.Types.ObjectId, ref: 'Link'}]
}, {
    timestamps: true
});

module.exports = mongoose.model('Project', ProjectSchema);