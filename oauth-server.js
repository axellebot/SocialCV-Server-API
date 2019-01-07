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
const AccessRestrictedError = require('@errors/AccessRestrictedError');
const AuthorizationCodeExpiredError = require('@errors/AuthorizationCodeExpiredError');
const BodyMissingDataError = require('@errors/BodyMissingDataError');
const BodyMissingTokenError = require('@errors/BodyMissingTokenError');
const BodyWrongDataError = require('@errors/BodyWrongDataError');
const ClientMissingError = require('@errors/ClientMissingError');
const ClientMissingGrantTypeError = require('@errors/ClientMissingGrantTypeError');
const ClientMissingPrivilegeError = require('@errors/ClientMissingPrivilegeError');
const ClientWrongCredentialsError = require('@errors/ClientWrongCredentialsError');
const CursorWrongPaginationError = require('@errors/CursorWrongPaginationError');
const CursorWrongSortError = require('@errors/CursorWrongSortError');
const DatabaseCountError = require('@errors/DatabaseCountError');
const DatabaseCreateError = require('@errors/DatabaseCreateError');
const DatabaseFindError = require('@errors/DatabaseFindError');
const DatabaseRemoveError = require('@errors/DatabaseRemoveError');
const DatabaseUpdateError = require('@errors/DatabaseUpdateError');
const NotFoundError = require('@errors/NotFoundError');
const NotImplementedError = require('@errors/NotImplementedError');
const ProtocolWrongError = require('@errors/ProtocolWrongError');
const TokenAuthenticationError = require('@errors/TokenAuthenticationError');
const TokenExpiredError = require('@errors/TokenExpiredError');
const UserDisabledError = require('@errors/UserDisabledError');
const UserMissingEmailError = require('@errors/UserMissingEmailError');
const UserMissingPasswordError = require('@errors/UserMissingPasswordError');
const UserMissingPrivilegeError = require('@errors/UserMissingPrivilegeError');
const UserMissingUsernameError = require('@errors/UserMissingUsernameError');
const UserNotFoundError = require('@errors/UserNotFoundError');
const UserWrongPasswordError = require('@errors/UserWrongPasswordError');

// create OAuth 2.0 server
const oauth2server = oauth2orize.createServer();

// Configured expiresIn
const expiresIn = {
  expires_in: config.accessToken.expiresIn
};

/**
 * Register supported Oauth 2.0 grant types.
 *
 * OAuth 2.0 specifies a framework that allows users to grant client
 * applications limited access to their protected resources.  It does this
 * through a process of the user granting access, and the client exchanging
 * the grant for an access token.
 *
 * The callback takes the `client` requesting authorization, the `redirectURI`
 * (which is used as a verifier in the subsequent exchange), the authenticated
 * `user` granting access, and their response, which contains approved scopes,
 * duration, etc. as parsed by the application.  The application issues a code,
 * which is bound to these values, and will be exchanged for an access token.
 */
// oauth2server.grant(oauth2orize.grant.code(async (client, redirectURI, user, ares, done) => {
//   try {
//     console.log("grant code", client, redirectURI, user, ares);

//     var code = utils.createCode();

//     var savedAuthorizationCode = await db.oauthAuthorizationCodes.create({
//       code: code,
//       client: client.id,
//       redirectUri: redirectURI,
//       user: user.id,
//       scope: ares.scope
//     });
//     if (!savedAuthorizationCode) throw new DatabaseCreateError();
//     return done(null, code);
//   } catch (err) {
//     done(err);
//   }
// }));


/**
 * Exchange authorization codes for access tokens.
 *
 * The callback accepts the `client`, which is exchanging `code` and any
 * `redirectURI` from the authorization request for verification.  If these values
 * are validated, the application issues an access token on behalf of the user who
 * authorized the code.
 *
 * grant_type="client_credentials"
 *
 */
oauth2server.exchange(oauth2orize.exchange.code(async (client, code, redirectURI, done) => {
  try {
    console.log("exchange code", client, code, redirectURI);
    
    // Check grant_type="authorization_code"
    if (!client) throw Error();
    if (!client.grantTypes.includes("authorization_code")) throw new ClientMissingGrantTypeError();
    
    var authorizationCode = await db.oauthAuthorizationCodes.findOne({
      code: code
    });
    if (!authorizationCode) throw new NotFoundError("AuthorizationCode");
    
    if (!client._id.equals(authorizationCode.client)) return done(null, false);// type
    
    // Check expiration date
    if(await authorizationCode.isExpired()) throw new AuthorizationCodeExpiredError();
    
    // Check Uri
    if (redirectURI && authorizationCode.redirectUris.contains(redirectURI)) return done(null, false);
    
    var savedAccessToken = await createAccessToken(authorizationCode.user, client._id,  code.scopes);
    if (!savedAccessToken) throw new DatabaseCreateError();
    
    var savedRefreshToken = await createRefreshToken(authorizationCode.user, client._id, code.scopes);
    if (!savedRefreshToken) throw new DatabaseCreateError();

    return done(null, savedAccessToken.token,savedRefreshToken.token,expiresIn);
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

    var savedAccessToken = await createAccessToken(user.id, client._id, await user.getScopes());
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
 * 
 * grant_type="client_credentials"
 *
 */
oauth2server.exchange(oauth2orize.exchange.clientCredentials(async (client, requestedScopes, done) => {
  try {
    var requestedScopes = requestedScopes || [];
    console.log("exchange clientCredentials", client, requestedScopes);
    
    // Check grant_type="client_credentials"
    if (!client) throw new ClientMissingError(); // Need client authentication
    if (!client.grantTypes.includes("client_credentials")) throw new ClientMissingGrantTypeError();

    // Check scopes
    var scopes = scopes || [];

    if (!requestedScopes.length > 0) Array.prototype.push.apply(scopes,client.scopes);

    if (!await client.verifyScopes(requestedScopes)) throw new ClientMissingPrivilegeError();
    Array.prototype.push.apply(scopes, requestedScopes);

    var savedAccessToken = await createAccessToken(null, client._id, scopes);
    if (!savedAccessToken) throw DatabaseCreateError();

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
 * 
 * grant_type="refresh_token"
 */
oauth2server.exchange(oauth2orize.exchange.refreshToken(async (client, refreshToken, requestedScopes, done) => {
  try {
    var requestedScopes = requestedScopes || [];
    console.log("exchange refreshToken", client, refreshToken, requestedScopes);

    var foundRefreshToken = await db.oauthRefreshTokens.findOne({
        token: refreshToken
      })
      .populate('user');
    if (!foundRefreshToken) throw new NotFoundError("Refresh token");
    
    // Check expiration date
    if(await foundRefreshToken.isExpired()) throw new TokenExpiredError();
    
    var scopes = foundRefreshToken.scopes;
    var user = foundRefreshToken.user;
  
    if (await user.verifyScopes(requestedScopes)) Array.prototype.push.apply(scopes, requestedScopes); // Added olders scopes to new scopes

    var deletedRefreshToken = await foundRefreshToken.remove();
    if (!deletedRefreshToken) throw new DatabaseDeleteError();

    var savedAccessToken = await createAccessToken(user._id, client._id, scopes);
    if (!savedAccessToken) throw new DatabaseCreateError();

    var savedRefreshToken = await createRefreshToken(user._id, client._id, scopes);
    if (!savedRefreshToken) throw new DatabaseCreateError();

    return done(null, savedAccessToken.token, savedRefreshToken.token, expiresIn);
  } catch (err) {
    done(err);
  }
}));

/**
 * Exchange user id and password for access tokens.
 *
 * The callback accepts the `client`, which is exchanging the client's id from the token
 * request for verification.  If this value is validated, the application issues an access
 * token on behalf of the client
 *
 * grant_type="password"
 */
oauth2server.exchange(oauth2orize.exchange.password(async (client, username, password, requestedScopes, done) => {
  try {
    var requestedScopes = requestedScopes || [];
    console.log("exchange password", client, username, password, requestedScopes);

    // Check grant_type="password"
    if (!client) throw new ClientMissingError(); // Need client authentication
    if (!client.grantTypes.includes("password")) throw ClientMissingGrantTypeError();

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
    if (!await user.verifyPassword(password)) throw new UserWrongPasswordError();


    // Check scopes
    var scopes = [];

    if (!requestedScopes.length > 0) Array.prototype.push.apply(scopes, await user.getScopes());

    if (await user.verifyScopes(requestedScopes)) {
      Array.prototype.push.apply(scopes, requestedScopes);
    } else {
      throw new UserMissingPrivilegeError();
    }


    // Save Access Token
    var savedAccessToken = await createAccessToken(user._id, client._id, scopes);
    if (!savedAccessToken) throw new DatabaseCreateError();

    // Save Refresh Token
    var savedRefreshToken = await createRefreshToken(savedAccessToken.user, client._id, scopes);
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
  return db.oauthAccessTokens.create({
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
  return db.oauthRefreshTokens.create({
    token: refreshToken,
    client: clientId,
    user: userId,
    expires: expirationDate,
    scopes: scopes
  });
}

module.exports = oauth2server;