"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oauth2server = void 0;
const oauth2orize_1 = require("oauth2orize");
const typeorm_1 = require("typeorm");
const entity_1 = require("./entity");
const oauth_1 = require("./entity/oauth");
const error_1 = require("./libs/error");
const logger_1 = require("./libs/logger");
const utils_1 = require("./libs/utils");
// Create OAuth 2.0 server
const oauth2server = (0, oauth2orize_1.createServer)();
exports.oauth2server = oauth2server;
// Repositories
const accessTokenRepo = (0, typeorm_1.getRepository)(oauth_1.OAuthAccessToken);
const refreshTokenRepo = (0, typeorm_1.getRepository)(oauth_1.OAuthRefreshToken);
const authCodeRepo = (0, typeorm_1.getRepository)(oauth_1.OAuthAuthorizationCode);
const userRepo = (0, typeorm_1.getRepository)(entity_1.User);
/**
 * Register supported Oauth 2.0 grant types.
 *
 * OAuth 2.0 specifies a framework that allows users to grant client
 * applications limited access to their protected resources.  It does this
 * through a process of the user granting access, and the client exchanging
 * the grant for an access token.
 *
 * The callback takes the `client` requesting authorization, the `redirectURI`
 * (which is used as a verifier in the subsequent exchange), the authenticate
 * `user` granting access, and their response, which contains approved scopes,
 * duration, etc. as parsed by the application.  The application issues a code,
 * which is bound to these values, and will be exchanged for an access token.
 */
oauth2server.grant(oauth2orize_1.grant.code(async (client, redirectURI, user, ares, done) => {
    try {
        logger_1.logger.info('grant code', client, redirectURI, user, ares);
        const code = (0, utils_1.generateCode)();
        const authCode = authCodeRepo.create({
            code,
            client: client.id,
            redirectUri: redirectURI,
            user: user.id,
            scope: ares.scope,
        });
        const authCodeSaved = await authCodeRepo.save(authCode);
        if (!authCodeSaved)
            throw new error_1.DatabaseCreateError();
        return done(null, code);
    }
    catch (err) {
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
 *
 * grant_type="client_credentials"
 *
 */
oauth2server.exchange(oauth2orize_1.exchange.code(async (client, code, redirectURI, done) => {
    try {
        logger_1.logger.info('exchange code', client, code, redirectURI);
        // Check grant_type="authorization_code"
        if (!client)
            throw Error();
        if (!client.grantTypes.includes('authorization_code'))
            throw new error_1.ClientMissingGrantTypeError();
        const codeRepo = (0, typeorm_1.getRepository)(oauth_1.OAuthAuthorizationCode);
        const conditions = {
            code,
        };
        const authorizationCode = await codeRepo.findOne(conditions);
        if (!authorizationCode)
            throw new error_1.NotFoundError('AuthorizationCode not found');
        // Check client math
        if (client.id !== authorizationCode.client.id)
            return done(null, false);
        // Check expiration date
        if (await authorizationCode.isExpired())
            throw new error_1.AuthorizationCodeExpiredError();
        // Check Uri
        if (redirectURI &&
            authorizationCode.redirectUris.includes(redirectURI))
            return done(null, false);
        const savedAccessToken = await createAccessToken(authorizationCode.user.id, client.id, authorizationCode.scopes);
        if (!savedAccessToken)
            throw new error_1.DatabaseCreateError();
        const savedRefreshToken = await createRefreshToken(authorizationCode.user.id, client.id, authorizationCode.scopes);
        if (!savedRefreshToken)
            throw new error_1.DatabaseCreateError();
        return done(null, savedAccessToken.token, savedRefreshToken.token);
    }
    catch (err) {
        done(err);
    }
}));
/**
 * Grant implicit authorization.
 *
 * The callback takes the `client` requesting authorization, the authenticate
 * `user` granting access, and their response, which contains approved scope,
 * duration, etc. as parsed by the application.  The application issues a token,
 * which is bound to these values.
 */
oauth2server.grant(oauth2orize_1.grant.token(async (client, user, ares, done) => {
    try {
        logger_1.logger.info('grant token', client, user, ares);
        const savedAccessToken = await createAccessToken(user.id, client.id, ares.scopes);
        if (!savedAccessToken)
            throw new error_1.DatabaseCreateError();
        return done(null, savedAccessToken.token, {
            expiresIn: savedAccessToken.expires,
        });
    }
    catch (err) {
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
oauth2server.exchange(oauth2orize_1.exchange.clientCredentials(async (client, requestedScopes, done) => {
    try {
        logger_1.logger.info('exchange clientCredentials', client, requestedScopes);
        if (!client)
            throw new error_1.ClientMissingError(); // Need client authentication
        // Check grant_type="client_credentials"
        if (!client.grantTypes.includes('client_credentials'))
            throw new error_1.ClientMissingGrantTypeError();
        // Check scopes
        const scopes = requestedScopes || [];
        if (requestedScopes.length <= 0)
            Array.prototype.push.apply(scopes, client.scopes);
        if (!(await client.verifyScopes(requestedScopes)))
            throw new error_1.ClientMissingPrivilegeError();
        Array.prototype.push.apply(scopes, requestedScopes);
        const savedAccessToken = await createAccessToken(undefined, client.id, scopes);
        if (!savedAccessToken)
            throw new error_1.DatabaseCreateError();
        const savedRefreshToken = await createRefreshToken(undefined, client.id, scopes);
        if (!savedRefreshToken)
            throw new error_1.DatabaseCreateError();
        return done(null, savedAccessToken.token, savedRefreshToken.token, {
            expiresIn: savedAccessToken.expires,
        });
    }
    catch (err) {
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
oauth2server.exchange(oauth2orize_1.exchange.refreshToken(async (client, refreshToken, requestedScopes, done) => {
    try {
        logger_1.logger.info('exchange refreshToken', client, refreshToken, requestedScopes);
        const foundRefreshToken = await refreshTokenRepo.findOne({
            token: refreshToken,
        });
        if (!foundRefreshToken)
            throw new error_1.NotFoundError('Refresh token');
        // Check expiration date
        if (await foundRefreshToken.isExpired())
            throw new error_1.TokenExpiredError();
        const scopes = foundRefreshToken.scopes;
        const user = foundRefreshToken.user;
        if (await user.verifyScopes(requestedScopes))
            Array.prototype.push.apply(scopes, requestedScopes); // Added olders scopes to new scopes
        const deletedRefreshToken = await refreshTokenRepo.softRemove(foundRefreshToken);
        if (!deletedRefreshToken)
            throw new error_1.DatabaseRemoveError();
        const savedAccessToken = await createAccessToken(user.id, client.id, scopes);
        if (!savedAccessToken)
            throw new error_1.DatabaseCreateError();
        const savedRefreshToken = await createRefreshToken(user.id, client.id, scopes);
        if (!savedRefreshToken)
            throw new error_1.DatabaseCreateError();
        return done(null, savedAccessToken.token, savedRefreshToken.token, {
            expiresIn: savedAccessToken.expires,
        });
    }
    catch (err) {
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
oauth2server.exchange(oauth2orize_1.exchange.password(async (client, username, password, requestedScopes, done) => {
    try {
        logger_1.logger.info('exchange password', client, username, requestedScopes);
        // Check grant_type="password"
        if (!client)
            throw new error_1.ClientMissingError(); // Need client authentication
        if (!client.grantTypes.includes('password'))
            throw new error_1.ClientMissingGrantTypeError();
        const user = await userRepo.findOne({
            where: [
                {
                    email: username,
                },
                {
                    username,
                },
            ],
        });
        if (!user)
            throw new error_1.UserNotFoundError();
        if (user.disabled)
            throw new error_1.UserDisabledError();
        // If there is a match and the passwords are equal
        if (!(await user.verifyPassword(password)))
            throw new error_1.UserWrongPasswordError();
        // Check scopes
        const scopes = [];
        if (requestedScopes.length <= 0)
            Array.prototype.push.apply(scopes, await user.getScopes());
        if (await user.verifyScopes(requestedScopes)) {
            Array.prototype.push.apply(scopes, requestedScopes);
        }
        else {
            throw new error_1.UserMissingPrivilegeError();
        }
        // Save Access Token
        const savedAccessToken = await createAccessToken(user.id, client.id, scopes);
        if (!savedAccessToken)
            throw new error_1.DatabaseCreateError();
        // Save Refresh Token
        const savedRefreshToken = await createRefreshToken(user.id, client.id, scopes);
        if (!savedRefreshToken)
            throw new error_1.DatabaseCreateError();
        return done(null, // No error
        savedAccessToken.token, // The generated access token
        savedRefreshToken.token, // The generated refresh token
        {
            expiresIn: savedAccessToken.expires, // Additional properties to be merged with the token and send in the response
        });
    }
    catch (err) {
        done(err);
    }
}));
const createAccessToken = async (userId, clientId, scopes) => {
    const token = (0, utils_1.generateToken)();
    const expirationDate = (0, utils_1.generateAccessTokenExpiration)();
    const accessToken = accessTokenRepo.create({
        token,
        client: clientId,
        user: userId,
        expires: expirationDate,
        scopes,
    });
    return accessToken;
};
const createRefreshToken = async (userId, clientId, scopes) => {
    const token = (0, utils_1.generateToken)();
    const expirationDate = (0, utils_1.generateRefreshTokenExpiration)();
    const refreshToken = refreshTokenRepo.create({
        token,
        client: clientId,
        user: userId,
        expires: expirationDate,
        scopes,
    });
    return refreshToken;
};
oauth2server.serializeClient(async (client, done) => {
    return done(null, client.id);
});
oauth2server.deserializeClient(async (id, done) => {
    try {
        const clientRepo = (0, typeorm_1.getRepository)(oauth_1.OAuthClient);
        const client = await clientRepo.findOne(id);
        if (!client)
            throw new error_1.NotFoundError('OAuth2 Client not found');
        done(null, client);
    }
    catch (err) {
        done(err);
    }
});
