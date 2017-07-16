var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

const uuid = require("../helpers").uuid;

var FrameworkTagSchema = new Schema({
    _id: {type: String, default: uuid},
    user:{ type: String, ref: 'User' },
    label: String,
    icon: String
}, {
    timestamps: true
});

module.exports = mongoose.model('FrameworkTag', FrameworkTagSchema);