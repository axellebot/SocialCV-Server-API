"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.getToken = void 0;
const typeorm_1 = require("typeorm");
const oauth_1 = require("../entity/oauth");
const oauth_2 = require("../oauth");
const oauthClientRepo = (0, typeorm_1.getRepository)(oauth_1.OAuthClient);
// Token Controller (handle access and refresh token)
exports.getToken = oauth_2.oauth2server.token();
// Authorise Controller
exports.authorize = oauth_2.oauth2server.authorize(async (clientID, redirectURI, done) => {
    try {
        const oauthClient = await oauthClientRepo.findOne(clientID);
        if (!oauthClient) {
            return done(null, false);
        }
        // Check if redirectUri corresponds to one of client redirectUri
        if (oauthClient.redirectUris.includes(redirectURI)) {
            return done(null, false);
        }
        return done(null, oauthClient, redirectURI);
    }
    catch (err) {
        done(err);
    }
});
