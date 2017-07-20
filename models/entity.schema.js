"use strict";

var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

const uuid = require("../helpers").uuid;
const COLLECTION_NAME = COLLECTION.COLLECTION_ENTITY;

var EntitySchema = new Schema({
    _id: {type: String, default: uuid},
    label: String,
    description: String,
    address: String,
    links: [{type: String, ref: COLLECTION.COLLECTION_LINK}],
    user: {type: String, ref: COLLECTION.COLLECTION_USER}
}, {
    timestamps: true
});

module.exports = mongoose.model(COLLECTION_NAME, EntitySchema);