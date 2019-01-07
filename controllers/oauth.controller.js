"use strict";

// Packages
const oauth2orize = require('oauth2orize');

// Others
const oauth = require('@oauth');
const db = require('@db');
const passport = require('@passport');

// Constants
const messages = require('@constants/messages');
const statuses = require('@constants/statuses');
const models = require('@constants/models');
const parameters = require('@constants/parameters');

// Errors
const AccessRestrictedError=require('@errors/AccessRestrictedError');
const BodyMissingDataError =require('@errors/BodyMissingDataError');
const BodyMissingTokenError =require('@errors/BodyMissingTokenError');
const BodyWrongDataError =require('@errors/BodyWrongDataError');
const ClientMissingPrivilegeError=require('@errors/ClientMissingPrivilegeError');
const CursorWrongPaginationError=require('@errors/CursorWrongPaginationError');
const CursorWrongSortError=require('@errors/CursorWrongSortError');
const DatabaseCountError = require('@errors/DatabaseCountError');
const DatabaseCreateError = require('@errors/DatabaseCreateError');
const DatabaseFindError = require('@errors/DatabaseFindError');
const DatabaseRemoveError = require('@errors/DatabaseRemoveError');
const DatabaseUpdateError = require('@errors/DatabaseUpdateError');
const NotFoundError = require('@errors/NotFoundError');
const NotImplementedError = require('@errors/NotImplementedError');
const ProtocolWrongError= require('@errors/ProtocolWrongError');
const TokenAuthenticationError = require('@errors/TokenAuthenticationError');
const TokenExpiredError = require('@errors/TokenExpiredError');
const UserDisabledError =require('@errors/UserDisabledError');
const UserMissingEmailError=require('@errors/UserMissingEmailError');
const UserMissingPasswordError=require('@errors/UserMissingPasswordError');
const UserMissingPrivilegeError = require('@errors/UserMissingPrivilegeError');
const UserMissingUsernameError = require('@errors/UserMissingUsernameError');
const UserNotFoundError = require('@errors/UserNotFoundError');
const UserWrongPasswordError = require('@errors/UserWrongPasswordError');

// Responses
const LoginResponse = require('@responses/LoginResponse');

//= =======================================
// Token Controller (access and refresh token)
//= =======================================
exports.getToken = oauth.token();

//= =======================================
// Authorise Controller
//= =======================================
exports.authorize = [
  oauth.authorize(async (clientID, redirectURI, done) => {
    try{
    var client = await db.oauthClients.findOne({
      _id: clientID
    });
    if (!client) {
      return done(null, false);
    }
    if (client.redirectUris.contains(redirectURI)) {
      return done(null, false);
    }
    return done(null, client, client.redirectURI);
    }catch(err){
      done(err);
    }
  }),
  async function(req, res, next) {
    next();
  }
];