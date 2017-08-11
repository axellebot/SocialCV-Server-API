"use strict";

var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

const uuid = require("../helpers").uuid;

var ProgrammingLanguageSchema = new Schema({
    _id: {type: String, default: uuid()},
    label: {type: String, default:"", required: true},
    user: {type: String, default: null, required: true, ref: MODEL_NAME_USER}
}, {
    timestamps: true
});

module.exports = mongoose.model(MODEL_NAME_PROGRAMMING_LANGUAGE, ProgrammingLanguageSchema, COLLECTION_NAME_PROGRAMMING_LANGUAGE);