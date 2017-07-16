var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

const uuid = require("../helpers").uuid;
const COLLECTION_NAME = global.constants.COLLECTION.COLLECTION_FRAMEWORK_TAG;

var FrameworkTagSchema = new Schema({
    _id: {type: String, default: uuid},
    label: String,
    icon: String,
    user: {type: String, ref: global.constants.COLLECTION.COLLECTION_USER}
}, {
    timestamps: true
});

module.exports = mongoose.model(COLLECTION_NAME, FrameworkTagSchema);