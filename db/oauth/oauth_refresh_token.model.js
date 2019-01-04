"use strict";

var mongoose = require('@mongoose');
var Schema = mongoose.Schema;

// Constants
const models = require('@constants/models');

var OAuthRefreshTokenSchema = new Schema({
  refreshToken: String,
  expires: Date,
  scope: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: models.MODEL_NAME_USER,
  },
  oauthClient: {
    type: Schema.Types.ObjectId,
    ref: models.MODEL_NAME_OAUTH_CLIENT,
  },
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});

module.exports = mongoose.model(models.MODEL_NAME_OAUTH_REFRESH_TOKEN, OAuthRefreshTokenSchema, "oauthRefreshTokens");