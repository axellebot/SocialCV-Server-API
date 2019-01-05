"use strict";

// Constants
const models = require('@constants/models');
const permissions = require('@constants/permissions');
const mongoose = require('@mongoose');
const db = require('@db');

var Schema = mongoose.Schema;

const enumPerms = [permissions.PERMISSION_ALL, permissions.PERMISSION_OWN, permissions.PERMISSION_OWN];

const permissionsSchema = {
  type: String,
  enum: enumPerms,
};

var PermissionSchema = new Schema({
  role: {
    type: String,
    default: permissions.ROLE_PUBLIC,
    required: true
  },
  scopes: {
    type: [String],
    required: true,
    default: []
  },
  inherits: {
    type: [String],
    required: true,
    default: ["ROLE_PUBLIC"]
  }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});

/**
 * getScopes
 *
 * return array of 
 */
PermissionSchema.methods.getScopes = async function(countLoop) {
  // Count Loop in case of inheritance role loop
  if (countLoop) {
    countLoop++;
    if (countLoop > 1) return [];
  } else {
    countLoop = 0;
  }

  var scopes = [];
  scopes = scopes.concat(this.scopes); // add permission scopes

  if (this.inherits.size > 0) {
    var permissions = await db.permissions.find({
      'role': {
        $in: this.inherits
      }
    });

    if (permissions.size > 0) {
      for (var permission in permissions) {
        var tmp = await permission.getScopes(countLoop);
        Array.prototype.push.apply(scopes, );
      }
    }
  }

  scopes = scopes.filter((v, i) => scopes.indexOf(v) === i); // remove duplicates
  return scopes;
}

module.exports = mongoose.model(models.MODEL_NAME_ROLE, PermissionSchema, "permissions");