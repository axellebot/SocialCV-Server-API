"use strict";

// Requires packages
const bcrypt = require('bcrypt');

// Constants
const messages = require('../constants/messages');
const statuses = require('../constants/statuses');
const models = require('../constants/models');
const collections = require('../constants/collections');
const roles = require('../constants/roles');
const parameters = require('../constants/parameters');

var mongoose = require('../mongoose');
var Schema = mongoose.Schema;

//= ===============================
// User Schema
//= ===============================

var UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  disabled: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: [roles.ROLE_MEMBER, roles.ROLE_ADMIN],
    default: roles.ROLE_MEMBER,
    required: true
  }
}, {
  timestamps: true
});

//= ===============================
// User ORM Methods
//= ===============================

// Add save middleware to salt password
UserSchema.pre('save', function(next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(config.saltWorkFactor, function(err, salt) {
    if (err) return next(new Error(err));

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(new Error(err));
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

// Add middleware to verify the password
UserSchema.methods.verifyPassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model(models.MODEL_NAME_USER, UserSchema, collections.COLLECTION_NAME_USER);