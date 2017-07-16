var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

const uuid = require("../helpers").uuid;

var ProjectSchema = new Schema({
    _id: {type: String, default: uuid},
    user:{ type: String, ref: 'User' },
    label: String,
    description: String,
    projectTag: {type: String, ref: 'ProjectTag'},
    programmingLanguages: [{type: String, ref: 'ProgrammingLanguage'}],
    frameworks: [{type: String, ref: 'Framework'}],
    softwareFrameworks: [{type: String, ref: 'SoftwareFrameworks'}],
    links: [{type: String, ref: 'Link'}]
}, {
    timestamps: true
});

module.exports = mongoose.model('Project', ProjectSchema);