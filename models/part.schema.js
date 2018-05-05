"use strict";

var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

var PartSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: {
        type: String,
        default: "",
        required: true
    },
    profile: {
        type: Schema.Types.ObjectId,
        default: null,
        required: true,
        ref: MODEL_NAME_PROFILE
    },
    groups: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: MODEL_NAME_GROUP
        }],
        default: []
    },
    user: {
        type: String,
        default: null,
        required: true,
        ref: MODEL_NAME_USER
    }
}, {
    timestamps: true
});

module.exports = mongoose.model(MODEL_NAME_PART, PartSchema, COLLECTION_NAME_PART);