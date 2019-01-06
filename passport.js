"use strict";

// Required packages
const BearerStrategy = require('passport-http-bearer');
const OAuthClientPasswordStrategy = require('passport-oauth2-client-password');

// Others
const config = require('@config');
const utils = require('@utils');
const passport = require('passport');
const db = require('@db');

// Errors
const AccessRestrictedError=require('@errors/AccessRestrictedError');
const BodyMissingDataError =require('@errors/BodyMissingDataError');
const BodyMissingTokenError =require('@errors/BodyMissingTokenError');
const BodyWrongDataError =require('@errors/BodyWrongDataError');
const ClientMissingPrivilegeError=require('@errors/ClientMissingPrivilegeError');
const ClientWrongCredentialsError=require('@errors/ClientWrongCredentialsError');
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

/**
 * BearerStrategy
 *
 * This strategy is used to authenticate either user based on an access token
 * (aka a bearer token). If a user, they must have previously authorized a client
 * application, which is issued an access token to make requests on behalf of
 * the authorizing user.
 *
 * Use passport.authenticate(), specifying the 'bearer' strategy, to authenticate requests. 
 */
passport.use(new BearerStrategy(async (token, done) => {
  try {
    var accessToken = await db.oauthAccessTokens.findOne({
        token: token
      })
      .populate('user');

    if (!accessToken) throw new TokenAuthenticationError();
    if (accessToken.expires && Date.now() > accessToken.expires) throw new TokenExpiredError();

    return done(null, accessToken.user, {
      scopes: accessToken.scopes
    });
  } catch (err) {
    done(err);
  }
}));

/**
 * OAuthClientPasswordStrategy
 *
 * The OAuth 2.0 client password authentication strategy authenticates clients using a client ID and client secret.
 * Use passport.authenticate(), specifying the 'oauth2-client-password' strategy, to authenticate requests. 
 */
passport.use(new OAuthClientPasswordStrategy(async (clientId, clientSecret, done) => {
  try {
    var client = await db.oauthClients.findOne({
      _id: clientId
    });
    if (!client) throw new Error();
    if (client.secret != clientSecret) throw new ClientWrongCredentialsError();
    return done(null, client, {
      scopes: client.scopes
    });
  } catch (err) {
    done(err)
  };
}));

module.exports = passport;