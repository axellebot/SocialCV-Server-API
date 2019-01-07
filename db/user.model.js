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
    required: true,
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
UserSchema.methods.verifyPassword = async function(candidatePassword) {
  console.log("UserSchema:verifyPassword", this.passwordMethod);
  if (this.passwordMethod === "bcrypt") return await bcrypt.compare(candidatePassword, this.password);
  return (candidatePassword === this.password);
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
UserSchema.methods.getScopes = async function() {
  var scopes = [];
  var permissions = await db.permissions.find({
    'role': {
      $in: this.roles
    }
  });

  for (var permission of permissions) {
    var tmp = await permission.getScopes();
    Array.prototype.push.apply(scopes, tmp)
  }

  scopes = scopes.filter((v, i) => scopes.indexOf(v) === i); // remove duplicates
  return scopes;
}

/**
 * verifyScopes 
 * 
 * Check scopes
 */
UserSchema.methods.verifyScopes = async function(scopes) {
  const userScopes = await this.getScopes();
  if (!userScopes || userScopes.length <= 0) return false;
  for (var scope of scopes) {
    if (!userScopes.includes(scope)) return false;
  }
  return true;
};


module.exports = mongoose.model(models.MODEL_NAME_USER, UserSchema, "users");