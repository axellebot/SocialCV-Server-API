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
  redirectUris: [String],
  grantTypes: [String],
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


/**
 * verifyGrantTypes 
 * 
 * Check grantTypes
 */
OAuthClientSchema.methods.verifyGrantTypes = async function(grantTypes) {
  for (var grantType in grantTypes) {
    if (!this.grantTypes.includes(grantType)) return false;
  }
  return true;
};

/**
 * verifyScopes 
 * 
 * Check scopes
 */
OAuthClientSchema.methods.verifyScopes = async function(scopes) {
  const clientScopes = this.scopes;
  console.log("Client:verifyScopes", scopes, clientScopes);
  for (var scope of scopes) {
    if (!clientScopes.includes(scope)) return false;
  }
  return true;
};




module.exports = mongoose.model(models.MODEL_NAME_OAUTH_CLIENT, OAuthClientSchema, "oauthClients");