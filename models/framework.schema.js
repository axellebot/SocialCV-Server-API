"use strict";

var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

const uuid = require("../helpers").uuid;
const COLLECTION_NAME = COLLECTION.COLLECTION_FRAMEWORK;

var FrameworkSchema = new Schema({
    _id: {type: String, default: uuid},
    label: String,
    language: String,
    tags: [{type: String, ref: COLLECTION.COLLECTION_FRAMEWORK_TAG}],
    user: {type: String, ref: COLLECTION.COLLECTION_USER}
}, {
    timestamps: true
});

module.exports = mongoose.model(COLLECTION_NAME, FrameworkSchema);