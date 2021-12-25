"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuthRefreshToken = void 0;
const typeorm_1 = require("typeorm");
const _1 = require(".");
const __1 = require("..");
const version_type_1 = require("../version.type");
let OAuthRefreshToken = class OAuthRefreshToken {
    async isExpired() {
        return Date.now() > this.expires?.getTime();
    }
};
__decorate([
    (0, typeorm_1.Column)()
], OAuthRefreshToken.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.Column)()
], OAuthRefreshToken.prototype, "expires", void 0);
__decorate([
    (0, typeorm_1.Column)()
], OAuthRefreshToken.prototype, "scopes", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true })
], OAuthRefreshToken.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => __1.User, (user) => user.oauthRefreshTokens)
], OAuthRefreshToken.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true })
], OAuthRefreshToken.prototype, "clientId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.OAuthClient, (client) => client.oauthRefreshTokens)
], OAuthRefreshToken.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.Column)(() => version_type_1.Version)
], OAuthRefreshToken.prototype, "versioning", void 0);
OAuthRefreshToken = __decorate([
    (0, typeorm_1.Entity)()
], OAuthRefreshToken);
exports.OAuthRefreshToken = OAuthRefreshToken;
