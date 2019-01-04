"use strict";

var mongoose = require('@mongoose');
var Schema = mongoose.Schema;

// Constants
const models = require('@constants/models');

var OAuthAccessTokenSchema = new Schema({
  accessToken: String,
  expires: Date,
  scope: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: models.MODEL_NAME_USER,
  },
  oauthClient: {
    type: Schema.Types.ObjectId,
    ref: models.MODEL_NAME_OAUTH_CLIENT,
  }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});

module.exports = mongoose.model(models.MODEL_NAME_OAUTH_ACCESS_TOKEN, OAuthAccessTokenSchema, "oauthAccessTokens");