"use strict";

var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

const uuid = require("../helpers").uuid;
const COLLECTION_NAME = global.constants.COLLECTION.COLLECTION_PROJECT;

var ProjectSchema = new Schema({
    _id: {type: String, default: uuid},
    label: String,
    description: String,
    links: [{type: String, ref: global.constants.COLLECTION.LINK}],
    tag: {type: String, ref: global.constants.COLLECTION.COLLECTION_PROJECT},
    more: {
        programmingLanguages: [{type: String, ref: global.constants.COLLECTION.COLLECTION_PROGRAMMING_LANGUAGE}],
        frameworks: [{type: String, ref: global.constants.COLLECTION.COLLECTION_FRAMEWORK}],
        softwareFrameworks: [{type: String, ref: global.constants.COLLECTION.COLLECTION_SOFTWARE_FRAMEWORK}]
    },
    user: {type: String, ref: global.constants.COLLECTION.COLLECTION_USER}
}, {
    timestamps: true
});

module.exports = mongoose.model(COLLECTION_NAME, ProjectSchema);