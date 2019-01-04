"use strict";

// Requires packages
const bcrypt = require('bcrypt');

// Config
const config = require('@config');

// Constants
const models = require('@constants/models');

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
    type: Boolean,
    required: true,
    default: true
  },
  permission: {
    type: Schema.Types.ObjectId,
    ref: models.MODEL_NAME_PERMISSION,
    required: true
  },
  picture: {
    type: String,
    default: "",
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
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
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
UserSchema.methods.verifyPassword = (candidatePassword) =>{
  return bcrypt.compare(candidatePassword, this.password)
};

UserSchema.methods.publicData = () =>{
  return {
    _id: this._id,
    email: this.email,
    username: this.username,
    profiles: this.profiles,
    picture: this.picture,
    permission: this.permission,
  };
};

module.exports = mongoose.model(models.MODEL_NAME_USER, UserSchema, "users");