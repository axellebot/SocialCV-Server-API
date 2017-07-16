var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

const uuid = require("../helpers").uuid;

var LinkSchema = new Schema({
    _id: {type: String, default: uuid},
    user:{ type: String, ref: 'User' },
    label: String,
    uri: String,
    tag: {type: String, ref: 'LinkTag'}
}, {
    timestamps: true
});

module.exports = mongoose.model('Link', LinkSchema);