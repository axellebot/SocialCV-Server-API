"use strict";

var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

const uuid = require("../helpers").uuid;
const COLLECTION_NAME = COLLECTION.COLLECTION_LANGUAGE;

var LanguageSchema = new Schema({
    _id: {type: String, default: uuid},
    label: String,
    description: String,
    user: {type: String, ref: COLLECTION.COLLECTION_USER}
}, {
    timestamps: true
});

module.exports = mongoose.model(COLLECTION_NAME, LanguageSchema);