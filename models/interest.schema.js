"use strict";

var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

const uuid = require("../helpers").uuid;

var InterestSchema = new Schema({
    _id: {type: String, default: uuid()},
    label: {type: String, default: "", required: true},
    description: {type: String, default: ""},
    user: {type: String, default: null, required: true, ref: MODEL_NAME_USER}
}, {
    timestamps: true
});

module.exports = mongoose.model(MODEL_NAME_INTEREST, InterestSchema, COLLECTION_NAME_INTEREST);