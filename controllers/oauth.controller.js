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
const DatabaseFindError = require('@errors/DatabaseFindError');
const DatabaseCountError = require('@errors/DatabaseCountError');
const DatabaseCreateError = require('@errors/DatabaseCreateError');
const DatabaseUpdateError = require('@errors/DatabaseUpdateError');
const DatabaseRemoveError = require('@errors/DatabaseRemoveError');
const MissingPrivilegeError = require('@errors/MissingPrivilegeError');
const NotFoundError = require('@errors/NotFoundError');
const NotImplementedError = require('@errors/NotImplementedError');

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
    if (client.redirectUri != redirectURI) {
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