"use strict";

// Requires packages
const bcrypt = require('bcrypt');

// Config
const config = require('@config');

// Constants
const models = require('@constants/models');
const roles = require('@constants/roles');

var mongoose = require('@mongoose');
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
  passwordMethod: {
    type: String,
    required: false,
  },
  disabled: {
    type: String,
    required: true,
    default: false
  },
  permission: {
    type: Schema.Types.ObjectId,
    ref: models.MODEL_NAME_PERMISSION,
    required: true
  },
  profiles: {
    type: [{
      type: Schema.Types.ObjectId,
      default: null,
      required: true,
      ref: models.MODEL_NAME_PROFILE
    }],
    required: true,
    default: []
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
  bcrypt.genSalt(config.saltWorkFactor, (err, salt) => {
    if (err) return next(new Error(err));

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(new Error(err));
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

// Add method to verify the password (must be a FUNCTION declaration -No ES2015)
UserSchema.methods.verifyPassword = function(candidatePassword) {
  var user = this;
  return new Promise(function(resolve, reject) {
    bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
      if (err) reject(err);
      resolve(isMatch);
    });
  });
};

module.exports = mongoose.model(models.MODEL_NAME_USER, UserSchema, "users");