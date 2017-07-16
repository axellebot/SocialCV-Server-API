var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

const uuid = require("../helpers").uuid;

var EntitySchema = new Schema({
    _id: {type: String, default: uuid},
    label: String,
    description: String,
    address: String,
    links: [{type: String, ref: 'Link'}]
},{
    timestamps: true
});

module.exports = mongoose.model('Entity', EntitySchema);