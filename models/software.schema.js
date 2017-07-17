"use strict";

var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

const uuid = require("../helpers").uuid;
const COLLECTION_NAME = global.constants.COLLECTION.COLLECTION_SOFTWARE;

var SoftwareSchema = new Schema({
    _id: {type: String, default: uuid},
    label: String,
    description: String,
    tag: {type: String, ref: global.constants.COLLECTION.COLLECTION_SOFTWARE_TAG},
    user: {type: String, ref: global.constants.COLLECTION.COLLECTION_USER}
}, {
    timestamps: true
});

module.exports = mongoose.model(COLLECTION_NAME, SoftwareSchema);