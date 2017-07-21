"use strict";

var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

const uuid = require("../helpers").uuid;

var OperatingSystemSchema = new Schema({
    _id: {type: String, default: uuid()},
    label: String,
    user: {type: String, ref: MODEL_NAME_USER}
}, {
    timestamps: true
});

module.exports = mongoose.model(MODEL_NAME_OPERATING_SYSTEM, OperatingSystemSchema,COLLECTION_NAME_OPERATING_SYSTEM);