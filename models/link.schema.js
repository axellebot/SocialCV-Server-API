"use strict";

var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

const uuid = require("../helpers").uuid;

var LinkSchema = new Schema({
    _id: {type: String, default: uuid},
    label: String,
    uri: String,
    tag: {type: String, ref: MODEL_NAME_LINK_TAG},
    user: {type: String, ref: MODEL_NAME_USER}
}, {
    timestamps: true
});

module.exports = mongoose.model(MODEL_NAME_LINK, LinkSchema, COLLECTION_NAME_LINK);