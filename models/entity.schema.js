var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

const uuid = require("../helpers").uuid;

var EntitySchema = new Schema({
    _id: {type: String, default: uuid},
    user:{ type: String, ref: 'User' },
    label: String,
    description: String,
    address: String,
    links: [{type: String, ref: 'Link'}]
},{
    timestamps: true
});

module.exports = mongoose.model('Entity', EntitySchema);