"use strict";

// Others
const config = require('@config');
const mongoose = require('@mongoose');
const models = require('@constants/models');

// Create schema
var Schema = mongoose.Schema;

var OAuthClientSchema = new Schema({
  name: String,
  secret: String,
  redirectUri: String,
  grantTypes: String,
  scopes: {
    type: [String],
    required: true,
    default: []
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: models.MODEL_NAME_USER,
  },
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});

module.exports = mongoose.model(models.MODEL_NAME_OAUTH_CLIENT, OAuthClientSchema, "oauthClients");