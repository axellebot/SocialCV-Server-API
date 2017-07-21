"use strict";

var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

const uuid = require("../helpers").uuid;

var ProjectSchema = new Schema({
    _id: {type: String, default: uuid()},
    label: String,
    description: String,
    links: [{type: String, ref: MODEL_NAME_LINK}],
    tag: {type: String, ref: MODEL_NAME_PROJECT},
    more: {
        programmingLanguages: [{type: String, ref: MODEL_NAME_PROGRAMMING_LANGUAGE}],
        frameworks: [{type: String, ref: MODEL_NAME_FRAMEWORK}],
        softwareFrameworks: [{type: String, ref: MODEL_NAME_SOFTWARE_FRAMEWORK}]
    },
    user: {type: String, ref: MODEL_NAME_USER}
}, {
    timestamps: true
});

module.exports = mongoose.model(MODEL_NAME_PROJECT, ProjectSchema, COLLECTION_NAME_PROJECT);