"use strict";

var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

const uuid = require("../helpers").uuid;

var EducationSchema = new Schema({
    _id: {type: String, default: uuid()},
    label: {type: String, default: "", required: true},
    description: {type: String, default: ""},
    entity: {type: String, default: null, ref: MODEL_NAME_ENTITY},
    startDate: {type: Date, default: null},
    endDate: {type: Date, default: null},
    user: {type: String, default: null, required: true, ref: MODEL_NAME_USER}
}, {
    timestamps: true
});

module.exports = mongoose.model(MODEL_NAME_EDUCATION, EducationSchema, COLLECTION_NAME_EDUCATION);