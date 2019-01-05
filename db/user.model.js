"use strict";

// Packages
const bcrypt = require('bcrypt');

// Others
const config = require('@config');
const models = require('@constants/models');
const permissions = require('@constants/permissions');
const mongoose = require('@mongoose');
const db = require('@db');

// Create Schema
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
  roles: {
    type: [String],
    required: true,
    default: [permissions.PERMISSION_ROLE_GUEST]
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
// User ORM Methods (don't use ES function)
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



// Add method to verify the password
UserSchema.methods.verifyPassword = (candidatePassword) => {
  return bcrypt.compare(candidatePassword, this.password)
};

/**
 * publicData
 *
 * return User public data object
 */
UserSchema.methods.publicData = function() {
  return {
    _id: this._id,
    email: this.email,
    username: this.username,
    roles: this.roles,
    disabled: this.disabled,
    profiles: this.profiles,
    picture: this.picture
  };
};

/**
 * getScopes
 *
 * return array of strings scope
 */
UserSchema.methods.getScopes = function() {
  var scopes = db.permissions
    .find({
      'role': {
        $in: this.roles
      }
    })
    .exec((err, permissions) => {
      var tmp = [];
      if (err) return tmp;
      if (permissions.size > 0) permissions.forEach((permission) => Array.prototype.push.apply(tmp, permission.getScopes()));
      console.log("test",tmp);
      return tmp;
    });

  scopes = scopes.filter((v, i) => scopes.indexOf(v) === i); // remove duplicates
  return scopes;
}

/**
 * verifyScopes 
 * 
 * Check scopes
 */
UserSchema.methods.verifyScopes = function(scopes) {
  const userScopes = this.getScopes();
  for (var scope in scopes) {
    if (!userScopes.contains(scope)) return false;
  }
  return true;
};


module.exports = mongoose.model(models.MODEL_NAME_USER, UserSchema, "users");