"use strict";

var mongoose = require('../mongoose');
var Schema = mongoose.Schema;


var EntrySchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: {
        type: String,
        default: "",
        required: true
    },
    type: {
        type: String,
        default: "",
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        default: null,
        required: true,
        ref: MODEL_NAME_USER
    },
    group: {
        type: Schema.Types.ObjectId,
        default: null,
        required: true,
        ref: MODEL_NAME_GROUP
    }
}, {
    timestamps: true
});

module.exports = mongoose.model(MODEL_NAME_ENTRY, EntrySchema, COLLECTION_NAME_ENTRY);