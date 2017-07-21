"use strict";

var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

const uuid = require("../helpers").uuid;

var EntitySchema = new Schema({
    _id: {type: String, default: uuid()},
    label: String,
    description: String,
    address: String,
    links: [{type: String, ref: MODEL_NAME_LINK}],
    user: {type: String, ref: MODEL_NAME_USER}
}, {
    timestamps: true
});

module.exports = mongoose.model(MODEL_NAME_ENTITY, EntitySchema,COLLECTION_NAME_ENTITY);