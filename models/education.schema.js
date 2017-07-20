"use strict";

var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

const uuid = require("../helpers").uuid;
const COLLECTION_NAME = COLLECTION.COLLECTION_EDUCATION;

var EducationSchema = new Schema({
    _id: {type: String, default: uuid},
    label: String,
    description: String,
    entity: {type: String, ref: COLLECTION.COLLECTION_ENTITY},
    startDate: Date,
    endDate: Date,
    user: {type: String, ref: COLLECTION.COLLECTION_USER}
}, {
    timestamps: true
});

module.exports = mongoose.model(COLLECTION_NAME, EducationSchema);