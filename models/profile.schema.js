"use strict";

var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

const uuid = require("../helpers").uuid;

var ProfileSchema = new Schema({
    _id: {type: String, default: uuid()},
    label: {type: String, default: "",},
    address: {type: String, default: ""},
    links: {
        type: [{type: String, ref: MODEL_NAME_LINK}],
        default: []
    },
    user: {type: String, default: null, required: true, ref: MODEL_NAME_USER}
}, {
    timestamps: true
});

module.exports = mongoose.model(MODEL_NAME_PROFILE, ProfileSchema, COLLECTION_NAME_PROFILE);