var _ = require('lodash');

// Schemas
const User = require('@models/user.model');

const OAuthAccessToken = require('@models/oauth/oauth_access_token.model');
const OAuthAuthorizationCode = require('@models/oauth/oauth_authorization_code.model');
const OAuthClient = require('@models/oauth/oauth_client.model');
const OAuthRefreshToken = require('@models/oauth/oauth_refresh_token.model');
const OAuthScope = require('@models/oauth/oauth_scope.model');

// Errors
const DatabaseFindError = require('@errors/DatabaseFindError');
const DatabaseCountError = require('@errors/DatabaseCountError');
const DatabaseCreateError = require('@errors/DatabaseCreateError');
const DatabaseUpdateError = require('@errors/DatabaseUpdateError');
const DatabaseRemoveError = require('@errors/DatabaseRemoveError');
const MissingPrivilegeError = require('@errors/MissingPrivilegeError');
const NotFoundError = require('@errors/NotFoundError');
const NotImplementedError = require('@errors/NotImplementedError');

/**
 * getAccessToken
 * used to check access token existance
 */
function getAccessToken(bearerToken) {
  console.log("getAccessToken", bearerToken)
  return OAuthAccessToken
    .findOne({
      accessToken: bearerToken
    })
    .populate({
      path: 'user',
      populate: {
        path: 'permission',
      }
    })
    .populate('oauthClient')
    .then(function(accessToken) {
      console.log('at', accessToken)
      if (!accessToken) return false;
      accessToken.accessTokenExpiresAt = accessToken.expires; // Adding accessTokenExpiresAt -> default field uesd by lib
      return accessToken;
    })
    .catch(function(err) {
      console.log("getAccessToken - Err: ")
    });
}

function getClient(clientId, clientSecret) {
  console.log("getClient", clientId, clientSecret)
  const options = {
    clientId: clientId
  };
  if (clientSecret) options.clientSecret = clientSecret;

  return OAuthClient
    .findOne(options)
    .then(function(client) {
      if (!client) throw new NotFoundError("Client");
      var clientWithGrants = client;
      clientWithGrants.grants = ['authorization_code', 'password', 'refresh_token', 'client_credentials'];
      // Todo: need to create another table for redirect URIs
      //clientWithGrants.refreshTokenLifetime = integer optional
      //clientWithGrants.accessTokenLifetime  = integer optional
      return clientWithGrants;
    })
    .catch(function(err) {
      console.log("getClient - Err: ", err)
    });
}

function getUser(username, password) {
  console.log("getUser", username);
  return User
    .findOne({
      $or: [{
          email: username
        },
        {
          username: username
        }
      ]
    })
    .then(function(user) {
      console.log("user", user);
      if (!user) throw new UserNotFoundError();
      if (user.verifyPassword(password)) {
        return user.publicData();
      }
      throw new WrongPasswordError();
    })
    .catch(function(err) {
      console.log("getUser - Err: ", err);
    });
}

function revokeAuthorizationCode(code) {
  console.log("revokeAuthorizationCode", code)
  return OAuthAuthorizationCode
    .findOne({
      authorization_code: code.code
    })
    .then(function(rCode) {
      //if(rCode) rCode.destroy();
      /***
       * As per the discussion we need set older date
       * revokeToken will expected return a boolean in future version
       * https://github.com/oauthjs/node-oauth2-server/pull/274
       * https://github.com/oauthjs/node-oauth2-server/issues/290
       */
      var expiredCode = code;
      expiredCode.expiresAt = new Date(); // Set expiration date to now
      return expiredCode;
    })
    .catch(function(err) {
      console.log("getUser - Err: ", err)
    });
}

function revokeToken(token) {
  console.log("revokeToken", token)
  return OAuthRefreshToken
    .findOne({
      refresh_token: token.refreshToken
    })
    .then(function(rT) {
      if (rT) rT.destroy();
      /***
       * As per the discussion we need set older date
       * revokeToken will expected return a boolean in future version
       * https://github.com/oauthjs/node-oauth2-server/pull/274
       * https://github.com/oauthjs/node-oauth2-server/issues/290
       */
      var expiredToken = token
      expiredToken.refreshTokenExpiresAt = new Date();
      return expiredToken
    })
    .catch(function(err) {
      console.log("revokeToken - Err: ", err)
    });
}

function saveToken(token, client, user) {
  console.log("saveToken", token, client, user);
  return Promise.all([
      OAuthAccessToken.create({
        accessToken: token.accessToken,
        expires: token.accessTokenExpiresAt,
        oauthClient: client._id,
        user: user._id,
        scope: token.scope || client.scope
      }),
      token.refreshToken ? OAuthRefreshToken.create({ // no refresh token for client_credentials
        refreshToken: token.refreshToken,
        expires: token.refreshTokenExpiresAt,
        oauthClient: client._id,
        user: user._id,
        scope: token.scope || client.scope
      }) : [],

    ])
    .then(function(resultsArray) {
      return _.assign( // expected to return client and user, but not returning
        {
          client: client,
          user: user,
          accessToken: token.accessToken, // proxy
          refreshToken: token.refreshToken, // proxy
        },
        token
      )
    })
    .catch(function(err) {
      console.log("revokeToken - Err: ", err)
    });
}

function getAuthorizationCode(code) {
  console.log("getAuthorizationCode", code);
  return OAuthAuthorizationCode
    .findOne({
      authorizationCode: code
    })
    .populate('user')
    .populate('oauthClient')
    .then(function(authCodeModel) {
      if (!authCodeModel) return false;
      var client = authCodeModel.OAuthClient
      var user = authCodeModel.User
      var reCode = {
        code: code,
        client: client,
        expires: authCodeModel.expires,
        redirectUri: client.redirectUri,
        user: user,
        scope: authCodeModel.scope,
      };
      return reCode;
    })
    .catch(function(err) {
      console.log("getAuthorizationCode - Err: ", err)
    });
}

function saveAuthorizationCode(code, client, user) {
  console.log("saveAuthorizationCode", code, client, user)
  return OAuthAuthorizationCode
    .create({
      expires: code.expiresAt,
      oauthClient: client._id,
      authorizationCode: code.authorizationCode,
      user: user._id,
      scope: code.scope
    })
    .then(function() {
      code.code = code.authorizationCode;
      return code;
    })
    .catch(function(err) {
      console.log("saveAuthorizationCode - Err: ", err)
    });
}

function getUserFromClient(client) {
  console.log("getUserFromClient", client)
  var options = {
    clientId: client.clientId
  };
  if (client.client_secret) options.clientSecret = client.clientSecret;

  return OAuthClient
    .findOne(options)
    .populate('user')
    .then(function(client) {
      console.log(client)
      if (!client) return false;
      if (!client.user) return false;
      return client.user;
    })
    .catch(function(err) {
      console.log("getUserFromClient - Err: ", err)
    });
}

function getRefreshToken(refreshToken) {
  console.log("getRefreshToken", refreshToken)
  if (!refreshToken || refreshToken === 'undefined') return false;
  return OAuthRefreshToken
    .findOne({
      refreshToken: refreshToken
    })
    .populate('user')
    .populate('oauthClient')
    .then(function(savedRT) {
      console.log("srt", savedRT)
      var tokenTemp = {
        user: savedRT ? savedRT.user : {},
        client: savedRT ? savedRT.oauthClient : {},
        expires: savedRT ? new Date(savedRT.expires) : null,
        refreshToken: refreshToken,
        scope: savedRT.scope
      };
      return tokenTemp;
    }).catch(function(err) {
      console.log("getRefreshToken - Err: ", err)
    });
}

function validateScope(token, client, scope) {
  console.log("validateScope", token, client, scope)
  return (user.scope === client.scope) ? scope : false;
}

function verifyScope(token, scope) {
  console.log("verifyScope", token, scope);
  if (token.scope) {
    return token.scope.split(" ").includes(scope);
  } else {
    return false;
  }

}

module.exports = {
  //generateOAuthAccessToken, optional - used for jwt
  //generateAuthorizationCode, optional
  //generateOAuthRefreshToken, - optional
  getAccessToken: getAccessToken,
  getAuthorizationCode: getAuthorizationCode, //getOAuthAuthorizationCode renamed to,
  getClient: getClient,
  getRefreshToken: getRefreshToken,
  getUser: getUser,
  getUserFromClient: getUserFromClient,
  //grantTypeAllowed, Removed in oauth2-server 3.0
  revokeAuthorizationCode: revokeAuthorizationCode,
  revokeToken: revokeToken,
  saveToken: saveToken, //saveOAuthAccessToken, renamed to
  saveAuthorizationCode: saveAuthorizationCode, //renamed saveOAuthAuthorizationCode,
  //validateScope: validateScope,
  verifyScope: verifyScope,
}