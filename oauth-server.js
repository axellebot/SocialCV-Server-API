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
oauth2server.grant(oauth2orize.grant.code((client, redirectURI, user, ares, done) => {
  console.log("grant code",client,redirectURI,user,ares);
  var code = utils.uid(16);

  db.oauthAuthorizationCodes
    .create({
      code: code,
      client: client.id,
      redirectUri: redirectURI,
      user: user.id,
      scope: ares.scope
    })
    .then((savedAuthorizationCode) => {
      if (!savedAuthorizationCode) throw new DatabaseCreateError();
      return done(null, code);
    })
    .catch((err) => {
      done(err);
    });
}));


/**
 * Exchange authorization codes for access tokens.
 *
 * The callback accepts the `client`, which is exchanging `code` and any
 * `redirectURI` from the authorization request for verification.  If these values
 * are validated, the application issues an access token on behalf of the user who
 * authorized the code.
 */
oauth2server.exchange(oauth2orize.exchange.code((client, code, redirectURI, done) => {
  console.log("exchange code",client,code,redirectURI);
  db.oauthAuthorizationCodes
    .findOne({
      code: code
    })
    .then((authorizationCode) => {
      if (!authorizationCode) throw new NotFoundError("AuthorizationCode");

      if (client.id !== code.clientId) {
        return done(null, false);
      }
      if (redirectURI !== code.redirectUri) {
        return done(null, false);
      }

      var token = utils.createToken();

      return db.oauthAccessTokens
        .create({
          token: token,
          expires: config.accessToken.calculateExpirationDate(),
          user: authorizationCode.user,
          client: authorizationCode.client,
          scopes: authorizationCode.scopes
        });
    })
    .then((savedAccessToken) => {
      if (!savedAccessToken) throw new DatabaseCreateError();
      return done(null, savedAccessToken);
    })
    .catch((err) => {
      done(err);
    });
}));

/**
 * Grant implicit authorization.
 *
 * The callback takes the `client` requesting authorization, the authenticated
 * `user` granting access, and their response, which contains approved scope,
 * duration, etc. as parsed by the application.  The application issues a token,
 * which is bound to these values.
 */
oauth2server.grant(oauth2orize.grant.token((client, user, ares, done) => {
  console.log("grant token",client,user,ares);
  const token = utils.createToken();
  const expirationDate = config.accessToken.calculateExpirationDate();

  createAccessToken(user.id, client._id, user.getScopes())
    .then((savedAccessToken) => {
      if (!savedAccessToken) throw new DatabaseCreateError();
      return done(null, token, expiresIn);
    })
    .catch((err) => done(err));
}));

/**
 * Exchange the client id and password/secret for an access token.
 *
 * The callback accepts the `client`, which is exchanging the client's id and
 * password/secret from the token request for verification. If these values are validated, the
 * application issues an access token on behalf of the client who authorized the code.
 */
oauth2server.exchange(oauth2orize.exchange.clientCredentials((client, scope, done) => {
  console.log("exchange clientCredentials",client,scope);
  
  // Pass in a null for user id since there is no user when using this grant type
  return createAccessToken(null, client._id, scope.split(" "))

    .then((savedAccessToken) => done(null, savedAccessToken.token, null, expiresIn))
    .catch(err => done(err));
}));

/**
 * Exchange the refresh token for an access token.
 *
 * The callback accepts the `client`, which is exchanging the client's id from the token
 * request for verification.  If this value is validated, the application issues an access
 * token on behalf of the client who authorized the code
 */
oauth2server.exchange(oauth2orize.exchange.refreshToken((client, refreshToken, scopes, done) => {
    console.log("exchange refreshToken",client,refreshToken,scopes);
var accessToken;

  db.oauthRefreshTokens
    .findOne({
      token: refreshToken
    })
    .then((foundRefreshToken) => {
      if (!foundRefreshToken) throw new NotFoundError("Refresh token");

      foundRefreshToken.remove();

      return createAccessToken(foundRefreshToken.user, client._id, scopes);
    })
    .then((savedAccessToken) => {
      if (!savedAccessToken) throw new DatabaseCreateError();
      accessToken = savedAccessToken.token;
      return createRefreshToken(savedAccessToken.user, client._id, scopes);
    })
    .then((savedRefreshToken) => {
      if (!savedRefreshToken) throw new DatabaseCreateError();
      return done(null, accessToken, savedRefreshToken.token, expiresIn)
    })
    .catch((err) => done(err));
}));

/**
 * Find the user in the database with the requested username or email
 */
oauth2server.exchange(oauth2orize.exchange.password((client, username, password, scopes, done) => {
console.log("exchange password",username,password,scopes);
  var accessToken;

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

  db.users.findOne(options)
    .then((user) => {
      if (!user) throw new UserNotFoundError();
      if (user.disabled) throw new UserDisabledError();
      // If there is a match and the passwords are equal 
      if (!user.verifyPassword(password)) throw new WrongPasswordError();
      if(!user.verifyScopes(scopes)) throw new MissingPrivilegeError();
      return createAccessToken(user._id, client._id, scopes);
    })
    .then((savedAccessToken) => {
      if (!savedAccessToken) throw new DatabaseCreateError();
      accessToken = savedAccessToken.token;
      return createRefreshToken(savedAccessToken.user, client._id, savedAccessToken.scope);
    })
    .then((savedRefreshToken) => {
      if (!savedRefreshToken) throw new DatabaseCreateError();
      return done(null, /* No error*/
        accessToken, /* The generated token */
        savedRefreshToken.token, /* The generated refresh token */
        expiresIn /* Additional properties to be merged with the token and send in the response */
      );
    })
    .catch((err) => done(err));
}));

function createAccessToken(userId, clientId, scopes) {
  return db.oauthAccessTokens
    .create({
      client: clientId,
      user: userId,
      scopes: scopes
    });
}

function createRefreshToken(userId, clientId, scopes) {
  return db.oauthRefreshTokens
    .create({
      client: clientId,
      user: userId,
      scopes: scopes
    });
}

module.exports = oauth2server;