"use strict";

var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

const uuid = require("../helpers").uuid;

var ExperienceSchema = new Schema({
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

module.exports = mongoose.model(MODEL_NAME_EXPERIENCE, ExperienceSchema, COLLECTION_NAME_EXPERIENCE);