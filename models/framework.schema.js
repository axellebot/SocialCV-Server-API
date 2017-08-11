"use strict";

var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

const uuid = require("../helpers").uuid;

var FrameworkSchema = new Schema({
    _id: {type: String, default: uuid()},
    label: {type: String, default:"", required: true},
    language: {type: String, default:""},
    tags: {
        type: [{type: String, ref: MODEL_NAME_FRAMEWORK_TAG}],
        default: []
    },
    user: {type: String, default: null, required: true, ref: MODEL_NAME_USER}
}, {
    timestamps: true
});

module.exports = mongoose.model(MODEL_NAME_FRAMEWORK, FrameworkSchema,COLLECTION_NAME_FRAMEWORK);