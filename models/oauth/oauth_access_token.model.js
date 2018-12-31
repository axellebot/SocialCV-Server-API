"use strict";

var mongoose = require('@mongoose');
var Schema = mongoose.Schema;

// Constants
const models = require('@constants/models');

var OAuthAccessTokenSchema = new Schema({
  access_token: String,
  expires: Date,
  scope: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: models.MODEL_NAME_USER,
  },
  oauth_client: {
    type: Schema.Types.ObjectId,
    ref: models.MODEL_NAME_OAUTH_CLIENT,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model(models.MODEL_NAME_OAUTH_ACCESS_TOKEN, OAuthAccessTokenSchema, "oauth_access_tokens");