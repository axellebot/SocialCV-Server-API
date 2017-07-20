"use strict";

var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

const uuid = require("../helpers").uuid;
const COLLECTION_NAME = COLLECTION.COLLECTION_PROFILE;

var ProfileSchema = new Schema({
    _id: {type: String, default: uuid},
    firstName: String,
    lastName: String,
    address: String,
    links: [{type: String, ref: COLLECTION.COLLECTION_LINK}],
    user: {type: String, ref: COLLECTION.COLLECTION_USER}
}, {
    timestamps: true
});

module.exports = mongoose.model(COLLECTION_NAME, ProfileSchema);