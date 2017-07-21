"use strict";

var mongoose = require('../mongoose');

var saltPassword = require('../helpers').saltPassword;
var verifyPassword = require('../helpers').verifyPassword;

var Schema = mongoose.Schema;

const uuid = require("../helpers").uuid;

//= ===============================
// User Schema
//= ===============================

var UserSchema = new Schema({
    _id: {type: String, default: uuid},
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: [ROLE_MEMBER, ROLE_ADMIN],
        default: ROLE_MEMBER
    }
}, {
    timestamps: true
});

//= ===============================
// User ORM Methods
//= ===============================

//add middleware to salt password
UserSchema.pre('save', saltPassword);
//add middleware to verify the password
UserSchema.methods.verifyPassword = verifyPassword;

module.exports = mongoose.model(MODEL_NAME_USER, UserSchema, COLLECTION_NAME_USER, COLLECTION_NAME_USER);