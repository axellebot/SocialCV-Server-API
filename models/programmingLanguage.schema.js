"use strict";

var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

const uuid = require("../helpers").uuid;
const COLLECTION_NAME = COLLECTION.COLLECTION_PROGRAMMING_LANGUAGE;

var ProgrammingLanguageSchema = new Schema({
    _id: {type: String, default: uuid},
    label: String,
    user: {type: String, ref: COLLECTION.COLLECTION_USER}
}, {
    timestamps: true
});

module.exports = mongoose.model(COLLECTION_NAME, ProgrammingLanguageSchema);