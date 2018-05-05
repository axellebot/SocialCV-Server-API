"use strict";

var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

const uuid = require("../helpers").uuid;

var GroupSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: {
        type: String,
        default: "",
        required: true
    },
    part: {
        type: Schema.Types.ObjectId,
        default: null,
        required: true,
        ref: MODEL_NAME_PART
    },
    entries: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: MODEL_NAME_ENTRY
        }],
        default: []
    },
    user: {
        type: Schema.Types.ObjectId,
        default: null,
        required: true,
        ref: MODEL_NAME_USER
    }
}, {
    timestamps: true
});

module.exports = mongoose.model(MODEL_NAME_GROUP, GroupSchema, COLLECTION_NAME_GROUP);