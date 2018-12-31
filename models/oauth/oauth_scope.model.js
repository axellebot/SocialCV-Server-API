"use strict";

var mongoose = require('@mongoose');
var Schema = mongoose.Schema;

// Constants
const models = require('@constants/models');

var OAuthScopeSchema = new Schema({
  scope: String,
  is_default: Boolean
}, {
  timestamps: true
});

module.exports = mongoose.model(models.MODEL_NAME_OAUTH_SCOPE, OAuthScopeSchema, "oauth_scopes");