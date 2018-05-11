"use strict";

// Constants
const models = require('@constants/models');
const permissions = require('@constants/permissions');

var mongoose = require('@mongoose');
var Schema = mongoose.Schema;

const enumPerms = [permissions.PERMISSION_ALL, permissions.PERMISSION_OWN, permissions.PERMISSION_OWN];

const permissionsSchema = {
  type: String,
  enum: enumPerms,
};

var PermissionSchema = new Schema({
  role: {
    type: String,
    default: "ROLE_PUBLIC",
    required: true
  },
  scopes: {

    type: Schema.Types.Mixed,
    body: {
      type: {
        read: permissionsSchema,
        write: permissionsSchema,
        delete: permissionsSchema
      },
      required: true,
      default: {},
    },
    required: true,
    default: {}
  },
}, {
  timestamps: true
});

module.exports = mongoose.model(models.MODEL_NAME_PERMISSION, PermissionSchema, "permissions");