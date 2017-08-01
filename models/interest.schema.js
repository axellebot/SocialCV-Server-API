"use strict";

var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

const uuid = require("../helpers").uuid;

var InterestSchema = new Schema({
    _id: {type: String, default: uuid()},
    label: String,
    description: String,
    user: {type: String, ref: MODEL_NAME_USER}
}, {
    timestamps: true
});

module.exports = mongoose.model(MODEL_NAME_INTEREST, InterestSchema,COLLECTION_NAME_INTEREST);