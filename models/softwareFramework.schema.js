"use strict";

var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

const uuid = require("../helpers").uuid;

var SoftwareFrameworkSchema = new Schema({
    _id: {type: String, default: uuid()},
    label:String,
    user: {type: String, ref: MODEL_NAME_USER}
},{
    timestamps: true
});

module.exports = mongoose.model(MODEL_NAME_SOFTWARE_FRAMEWORK, SoftwareFrameworkSchema,COLLECTION_NAME_SOFTWARE_FRAMEWORK);