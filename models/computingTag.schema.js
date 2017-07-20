"use strict";

var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

const uuid = require("../helpers").uuid;
const COLLECTION_NAME = COLLECTION.COLLECTION_COMPUTING_TAG;

var ComputingTagSchema = new Schema({
    _id: {type: String, default: uuid},
    label: String,
    icon: String,
    user: {type: String, ref: COLLECTION.COLLECTION_USER}
}, {
    timestamps: true
});

module.exports = mongoose.model(COLLECTION_NAME, ComputingTagSchema);