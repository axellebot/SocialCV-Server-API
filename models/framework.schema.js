var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

const uuid = require("../helpers").uuid;

var FrameworkSchema = new Schema({
    _id: {type: String, default: uuid},
    user:{ type: String, ref: 'User' },
    label: String,
    frameworkTags: [{type: String, ref: 'FrameworkTag'}],
    languageId: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Framework', FrameworkSchema);