"use strict";

var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

const uuid = require("../helpers").uuid;

var FrameworkSchema = new Schema({
    _id: {type: String, default: uuid},
    label: String,
    language: String,
    tags: [{type: String, ref: MODEL_NAME_FRAMEWORK_TAG}],
    user: {type: String, ref: MODEL_NAME_USER}
}, {
    timestamps: true
});

module.exports = mongoose.model(MODEL_NAME_FRAMEWORK, FrameworkSchema,COLLECTION_NAME_FRAMEWORK);