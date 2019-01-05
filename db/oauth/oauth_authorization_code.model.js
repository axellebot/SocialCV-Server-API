"use strict";

// Others
const mongoose = require('@mongoose');
const config = require('@config');
const models = require('@constants/models');

// Create schema
var Schema = mongoose.Schema;

var OAuthAuthorizationCodeSchema = new Schema({
  code: {
    type: String,
    unique: true,
    required: true
  },
  expires: {
    type: Date,
    required: true,
    default: Date(),
  },
  redirectUri: String,
  scopes: {
    type: [String],
    required: true,
    default: []
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: models.MODEL_NAME_USER,
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: models.MODEL_NAME_OAUTH_CLIENT,
  },
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});

module.exports = mongoose.model(models.MODEL_NAME_OAUTH_AUTHORIZATION_CODE, OAuthAuthorizationCodeSchema, "oauthAuthorizationCodes");