"use strict";

var mongoose = require('@mongoose');
var Schema = mongoose.Schema;

// Constants
const models = require('@constants/models');

var OAuthClientSchema = new Schema({
  name: String,
  clientId: String,
  clientSecret: String,
  redirectUri: String,
  grantTypes: String,
  scope: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: models.MODEL_NAME_USER,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model(models.MODEL_NAME_OAUTH_CLIENT, OAuthClientSchema, "oauthClients");