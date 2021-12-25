"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuthClient = void 0;
const typeorm_1 = require("typeorm");
const _1 = require(".");
const __1 = require("..");
const base_model_1 = require("../base.model");
const oauth_refresh_token_model_1 = require("./oauth_refresh_token.model");
let OAuthClient = class OAuthClient extends base_model_1.Base {
    /**
     * verifyGrantTypes
     *
     * Check grantTypes
     */
    async verifyGrantTypes(grantTypes) {
        for (const grantType in grantTypes) {
            if (!this.grantTypes?.includes(grantType))
                return false;
        }
        return true;
    }
    /**
     * verifyScopes
     *
     * Check scopes
     */
    async verifyScopes(scopes) {
        for (const scope of scopes) {
            if (!this.scopes?.includes(scope))
                return false;
        }
        return true;
    }
};
__decorate([
    (0, typeorm_1.Column)()
], OAuthClient.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)()
], OAuthClient.prototype, "secret", void 0);
__decorate([
    (0, typeorm_1.Column)()
], OAuthClient.prototype, "redirectUris", void 0);
__decorate([
    (0, typeorm_1.Column)()
], OAuthClient.prototype, "grantTypes", void 0);
__decorate([
    (0, typeorm_1.Column)()
], OAuthClient.prototype, "scopes", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true })
], OAuthClient.prototype, "ownerId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => __1.User, (user) => user.oauthClients)
], OAuthClient.prototype, "owner", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => _1.OAuthAuthorizationCode, (authCode) => authCode.client)
], OAuthClient.prototype, "oauthAuthorizationCode", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => _1.OAuthAccessToken, (token) => token.client)
], OAuthClient.prototype, "oauthAccessTokens", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => oauth_refresh_token_model_1.OAuthRefreshToken, (token) => token.client)
], OAuthClient.prototype, "oauthRefreshTokens", void 0);
OAuthClient = __decorate([
    (0, typeorm_1.Entity)()
], OAuthClient);
exports.OAuthClient = OAuthClient;
