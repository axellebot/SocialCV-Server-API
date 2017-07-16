var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

const uuid = require("../helpers").uuid;

var ProjectSchema = new Schema({
    _id: {type: String, default: uuid},
    user: {type: String, ref: 'User'},
    label: String,
    description: String,
    links: [{type: String, ref: 'Link'}],
    projectTag: {type: String, ref: 'ProjectTag'},
    more: {
        programmingLanguages: [{type: String, ref: 'ProgrammingLanguage'}],
        frameworks: [{type: String, ref: 'Framework'}],
        softwareFrameworks: [{type: String, ref: 'SoftwareFrameworks'}]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Project', ProjectSchema);