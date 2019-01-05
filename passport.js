"use strict";

// Required packages
const utils = require('@utils');
const passport = require('passport');
const BearerStrategy = require('passport-http-bearer');
const OAuthClientPasswordStrategy = require('passport-oauth2-client-password');
const db = require('@db');

// Config
var config = require('@config');

// Errors
const AccessRestrictedError = require('@errors/AccessRestrictedError');
const ExpiredAuthenticationTokenError = require('@errors/ExpiredAuthenticationTokenError');
const FailedAuthenticationTokenError = require('@errors/FailedAuthenticationTokenError');
const UserNotFoundError = require('@errors/UserNotFoundError');
const UserDisabledError = require('@errors/UserDisabledError');
const NotFoundError = require('@errors/NotFoundError');

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
    var token = await db.oauthAccessTokens.findOne({
        token: token
      })
      .populate({
        path: 'user',
        populate: {
          path: 'permission'
        }
      });

    if (!token) throw new FailedAuthenticationTokenError();
    if (token.expires) {
      if (Date.now() > token.expires) throw new ExpiredAuthenticationTokenError();
    }
    return done(null, token.user, {
      scopes: token.scopes
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
    if (!client) {
      throw new AccessRestrictedError();
    }
    if (client.secret != clientSecret) {
      throw new FailedAuthenticationTokenError();
    }
    return done(null, client, {
      scopes: client.scopes
    });
  } catch (err) {
    done(err)
  };
}));

module.exports = passport;