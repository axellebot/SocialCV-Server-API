"use strict";

// Packages
const oauth2orize = require('oauth2orize');
const passport = require('passport');
const BearerStrategy = require('passport-http-bearer');

// Others
const config = require('@config');
const utils = require('@utils');
const db = require('@db');

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
const UserNotFoundError = require('@errors/NotImplementedError');
const UserDisabledError = require('@errors/UserDisabledError');
const WrongPasswordError = require('@errors/WrongPasswordError');

// create OAuth 2.0 server
const oauth2server = oauth2orize.createServer();

// Configured expiresIn
const expiresIn = {
  expires_in: config.accessToken.expiresIn
};

/**
 * Grant authorization codes
 *
 * The callback takes the `client` requesting authorization, the `redirectURI`
 * (which is used as a verifier in the subsequent exchange), the authenticated
 * `user` granting access, and their response, which contains approved scopes,
 * duration, etc. as parsed by the application.  The application issues a code,
 * which is bound to these values, and will be exchanged for an access token.
 */
oauth2server.grant(oauth2orize.grant.code(async (client, redirectURI, user, ares, done) => {
  try {
    console.log("grant code", client, redirectURI, user, ares);

    var code = utils.uid(16);

    var savedAuthorizationCode = await db.oauthAuthorizationCodes.create({
      code: code,
      client: client.id,
      redirectUri: redirectURI,
      user: user.id,
      scope: ares.scope
    });
    if (!savedAuthorizationCode) throw new DatabaseCreateError();
    return done(null, code);
  } catch (err) {
    done(err);
  }
}));


/**
 * Exchange authorization codes for access tokens.
 *
 * The callback accepts the `client`, which is exchanging `code` and any
 * `redirectURI` from the authorization request for verification.  If these values
 * are validated, the application issues an access token on behalf of the user who
 * authorized the code.
 */
oauth2server.exchange(oauth2orize.exchange.code(async (client, code, redirectURI, done) => {
  try {
    console.log("exchange code", client, code, redirectURI);

    var authorizationCode = db.oauthAuthorizationCodes.findOne({
      code: code
    });

    if (!authorizationCode) throw new NotFoundError("AuthorizationCode");

    if (client.id !== code.clientId) {
      return done(null, false);
    }
    if (redirectURI !== code.redirectUri) {
      return done(null, false);
    }

    var token = utils.createToken();

    var savedAccessToken = await db.oauthAccessTokens.create({
      token: token,
      expires: config.accessToken.calculateExpirationDate(),
      user: authorizationCode.user,
      client: authorizationCode.client,
      scopes: authorizationCode.scopes
    });

    if (!savedAccessToken) throw new DatabaseCreateError();
    return done(null, savedAccessToken);
  } catch (err) {
    done(err);
  }
}));

/**
 * Grant implicit authorization.
 *
 * The callback takes the `client` requesting authorization, the authenticated
 * `user` granting access, and their response, which contains approved scope,
 * duration, etc. as parsed by the application.  The application issues a token,
 * which is bound to these values.
 */
oauth2server.grant(oauth2orize.grant.token(async (client, user, ares, done) => {
  try {
    console.log("grant token", client, user, ares);

    var savedAccessToken = await createAccessToken(user.id, client._id, user.getScopes());
    if (!savedAccessToken) throw new DatabaseCreateError();
    return done(null, token, expiresIn);
  } catch (err) {
    done(err);
  }
}));

/**
 * Exchange the client id and password/secret for an access token.
 *
 * The callback accepts the `client`, which is exchanging the client's id and
 * password/secret from the token request for verification. If these values are validated, the
 * application issues an access token on behalf of the client who authorized the code.
 */
oauth2server.exchange(oauth2orize.exchange.clientCredentials(async (client, scope, done) => {
  try {
    console.log("exchange clientCredentials", client, scope);

    // Pass in a null for user id since there is no user when using this grant type

    var savedAccessToken = await createAccessToken(null, client._id, scope.split(" "));

    return done(null, savedAccessToken.token, null, expiresIn);
  } catch (err) {
    done(err);
  }
}));

/**
 * Exchange the refresh token for an access token.
 *
 * The callback accepts the `client`, which is exchanging the client's id from the token
 * request for verification.  If this value is validated, the application issues an access
 * token on behalf of the client who authorized the code
 */
oauth2server.exchange(oauth2orize.exchange.refreshToken(async (client, refreshToken, scopes, done) => {
  try {
    scopes = scopes || "";
    console.log("exchange refreshToken", client, refreshToken, scopes);

    var foundRefreshToken = await db.oauthRefreshTokens.findOne({
      token: refreshToken
    });
    if (!foundRefreshToken) throw new NotFoundError("Refresh token");

    var deletedRefreshToken = await foundRefreshToken.remove();
    if (!deletedRefreshToken) throw new DatabaseDeleteError();

    var savedAccessToken = await createAccessToken(deletedRefreshToken.user, client._id, scopes);
    if (!savedAccessToken) throw new DatabaseCreateError();

    var savedRefreshToken = await createRefreshToken(savedAccessToken.user, client._id, scopes);
    if (!savedRefreshToken) throw new DatabaseCreateError();

    return done(null, savedAccessToken.token, savedRefreshToken.token, expiresIn);
  } catch (err) {
    done(err);
  }
}));

/**
 * Find the user in the database with the requested username or email
 */
oauth2server.exchange(oauth2orize.exchange.password(async (client, username, password, scopes, done) => {
  try {
    console.log("exchange password", username, password, scopes);

    if (!client) throw Error(); // Need client authentication
    if (!client.grantTypes.split(" ").includes("password")) throw MissingPrivilegeError();

    const options = {
      $or: [{
          email: username
        },
        {
          username: username
        }
      ]
    };

    var user = await db.users.findOne(options);
    if (!user) throw new UserNotFoundError();
    if (user.disabled) throw new UserDisabledError();
    // If there is a match and the passwords are equal 
    if (!user.verifyPassword(password)) throw new WrongPasswordError();
    if (!user.verifyScopes(scopes)) throw new MissingPrivilegeError();
    var savedAccessToken = await createAccessToken(user._id, client._id, scopes);
    if (!savedAccessToken) throw new DatabaseCreateError();
    var savedRefreshToken = await createRefreshToken(savedAccessToken.user, client._id, savedAccessToken.scope);
    if (!savedRefreshToken) throw new DatabaseCreateError();
    return done(null, /* No error*/
      savedAccessToken.token, /* The generated token */
      savedRefreshToken.token, /* The generated refresh token */
      expiresIn /* Additional properties to be merged with the token and send in the response */
    );
  } catch (err) {
    done(err);
  }
}));

async function createAccessToken(userId, clientId, scopes) {
  const accessToken = utils.createToken();
  const expirationDate = config.accessToken.calculateExpirationDate();
  return db.oauthAccessTokens
    .create({
      token: accessToken,
      client: clientId,
      user: userId,
      expires: expirationDate,
      scopes: scopes
    });
}

async function createRefreshToken(userId, clientId, scopes) {
  const refreshToken = utils.createToken();
  const expirationDate = config.refreshToken.calculateExpirationDate();
  return db.oauthRefreshTokens
    .create({
      token: refreshToken,
      client: clientId,
      user: userId,
      expires: expirationDate,
      scopes: scopes
    });
}

module.exports = oauth2server;