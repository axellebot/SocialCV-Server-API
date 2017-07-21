"use strict";

var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

const uuid = require("../helpers").uuid;

var ProfileSchema = new Schema({
    _id: {type: String, default: uuid},
    firstName: String,
    lastName: String,
    address: String,
    links: [{type: String, ref: MODEL_NAME_LINK}],
    user: {type: String, ref: MODEL_NAME_USER}
}, {
    timestamps: true
});

module.exports = mongoose.model(MODEL_NAME_PROFILE, ProfileSchema,COLLECTION_NAME_PROFILE);