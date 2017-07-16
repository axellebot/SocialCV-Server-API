var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

const uuid = require("../helpers").uuid;
const COLLECTION_NAME = global.constants.COLLECTION.COLLECTION_ENTITY;

var EntitySchema = new Schema({
    _id: {type: String, default: uuid},
    label: String,
    description: String,
    address: String,
    links: [{type: String, ref: global.constants.COLLECTION.COLLECTION_LINK}],
    user: {type: String, ref: global.constants.COLLECTION.COLLECTION_USER}
}, {
    timestamps: true
});

module.exports = mongoose.model(COLLECTION_NAME, EntitySchema);