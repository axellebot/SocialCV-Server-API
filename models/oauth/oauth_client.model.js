"use strict";

var mongoose = require('@mongoose');
var Schema = mongoose.Schema;

// Constants
const models = require('@constants/models');

var OAuthClientSchema = new Schema({
  name: String,
  client_id: String,
  client_secret: String,
  redirect_uri: String,
  grant_types: String,
  scope: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: models.MODEL_NAME_USER,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model(models.MODEL_NAME_OAUTH_CLIENT, OAuthClientSchema, "oauth_clients");