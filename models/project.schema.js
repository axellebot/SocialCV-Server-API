"use strict";

var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

const uuid = require("../helpers").uuid;

var ProjectSchema = new Schema({
    _id: {type: String, default: uuid()},
    label: {type: String, default: "", required: true},
    description: {type: String, default: ""},
    links: {
        type: [{type: String, ref: MODEL_NAME_LINK}],
        default: []
    },
    tag: {type: String, default: null, ref: MODEL_NAME_PROJECT},
    more: {
        programmingLanguages: {
            type: [{type: String, ref: MODEL_NAME_PROGRAMMING_LANGUAGE}],
            default: []
        },
        frameworks: {
            type: [{type: String, ref: MODEL_NAME_FRAMEWORK}],
            default: []
        },
        softwareFrameworks: {
            type: [{type: String, ref: MODEL_NAME_SOFTWARE_FRAMEWORK}],
            default: []
        }
    },
    user: {type: String, default: null, required: true, ref: MODEL_NAME_USER}
}, {
    timestamps: true
});

module.exports = mongoose.model(MODEL_NAME_PROJECT, ProjectSchema, COLLECTION_NAME_PROJECT);