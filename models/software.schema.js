"use strict";

var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

const uuid = require("../helpers").uuid;

var SoftwareSchema = new Schema({
    _id: {type: String, default: uuid()},
    label: {type: String, default: "", required: true},
    description: {type: String, default: ""},
    tag: {type: String, ref: MODEL_NAME_SOFTWARE_TAG},
    user: {type: String, default: null, required: true, ref: MODEL_NAME_USER}
}, {
    timestamps: true
});

module.exports = mongoose.model(MODEL_NAME_SOFTWARE, SoftwareSchema, COLLECTION_NAME_SOFTWARE);