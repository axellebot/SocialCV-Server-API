"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passport = void 0;
const passport_1 = __importDefault(require("passport"));
exports.passport = passport_1.default;
const passport_http_bearer_1 = __importDefault(require("passport-http-bearer"));
const passport_oauth2_client_password_1 = __importDefault(require("passport-oauth2-client-password"));
const typeorm_1 = require("typeorm");
const oauth_1 = require("../entity/oauth");
const error_1 = require("./error");
const logger_1 = require("./logger");
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
passport_1.default.use(new passport_http_bearer_1.default.Strategy({ passReqToCallback: true }, async (token, done) => {
    try {
        logger_1.logger.info('Authenticate Bearer', token);
        const accessTokenRepo = (0, typeorm_1.getRepository)(oauth_1.OAuthAccessToken);
        const accessToken = await accessTokenRepo.findOne({
            token,
        });
        if (!accessToken)
            throw new error_1.TokenAuthenticationError();
        logger_1.logger.info('accessToken', accessToken);
        if (await accessToken.isExpired())
            throw new error_1.TokenExpiredError();
        // issue : https://github.com/jaredhanson/passport-http-bearer/issues/60
        return done(null, accessToken.user || accessToken.client, {
            scope: accessToken.scopes,
        });
    }
    catch (err) {
        done(err);
    }
}));
/**
 * OAuthClientPasswordStrategy
 *
 * The OAuth 2.0 client password authentication strategy authenticate clients using a client ID and client secret.
 * Use passport.authenticate(), specifying the 'oauth2-client-password' strategy, to authenticate requests.
 */
passport_1.default.use(new passport_oauth2_client_password_1.default.Strategy(async (clientId, clientSecret, done) => {
    try {
        logger_1.logger.info('Authenticate OAuthClientPassword', clientId, clientSecret);
        const clientRepo = (0, typeorm_1.getRepository)(oauth_1.OAuthClient);
        const client = await clientRepo.findOne({
            id: clientId,
            secret: clientSecret,
        });
        if (!client)
            throw new error_1.ClientWrongCredentialsError();
        return done(null, client, {
            scopes: client.scopes,
        });
    }
    catch (err) {
        done(err);
    }
}));
