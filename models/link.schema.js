var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

const uuid = require("../helpers").uuid;
const COLLECTION_NAME = global.constants.COLLECTION.COLLECTION_LINK;

var LinkSchema = new Schema({
    _id: {type: String, default: uuid},
    label: String,
    uri: String,
    tag: {type: String, ref: global.constants.COLLECTION.COLLECTION_LINK_TAG},
    user: {type: String, ref: global.constants.COLLECTION.COLLECTION_USER}
}, {
    timestamps: true
});

module.exports = mongoose.model(COLLECTION_NAME, LinkSchema);