"use strict";

var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

const uuid = require("../helpers").uuid;

var LanguageSchema = new Schema({
    _id: {type: String, default: uuid},
    label: String,
    description: String,
    user: {type: String, ref: MODEL_NAME_USER}
}, {
    timestamps: true
});

module.exports = mongoose.model(MODEL_NAME_LANGUAGE, LanguageSchema, COLLECTION_NAME_LANGUAGE);