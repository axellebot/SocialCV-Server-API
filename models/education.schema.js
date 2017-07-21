"use strict";

var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

const uuid = require("../helpers").uuid;

var EducationSchema = new Schema({
    _id: {type: String, default: uuid},
    label: String,
    description: String,
    entity: {type: String, ref: MODEL_NAME_ENTITY},
    startDate: Date,
    endDate: Date,
    user: {type: String, ref: MODEL_NAME_USER}
}, {
    timestamps: true
});

module.exports = mongoose.model(MODEL_NAME_EDUCATION, EducationSchema, COLLECTION_NAME_EDUCATION);