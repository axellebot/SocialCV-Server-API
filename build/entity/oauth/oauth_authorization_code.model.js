"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuthAuthorizationCode = void 0;
const typeorm_1 = require("typeorm");
const __1 = require("..");
const version_type_1 = require("../version.type");
const oauth_client_model_1 = require("./oauth_client.model");
let OAuthAuthorizationCode = class OAuthAuthorizationCode {
    async isExpired() {
        return Date.now() > this.expires?.getTime();
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)()
], OAuthAuthorizationCode.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)()
], OAuthAuthorizationCode.prototype, "expires", void 0);
__decorate([
    (0, typeorm_1.Column)()
], OAuthAuthorizationCode.prototype, "redirectUris", void 0);
__decorate([
    (0, typeorm_1.Column)()
], OAuthAuthorizationCode.prototype, "scopes", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true })
], OAuthAuthorizationCode.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => __1.User, (user) => user.oauthAuthorizationCode)
], OAuthAuthorizationCode.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true })
], OAuthAuthorizationCode.prototype, "clientId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => oauth_client_model_1.OAuthClient, (client) => client.oauthAuthorizationCode)
], OAuthAuthorizationCode.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.Column)(() => version_type_1.Version)
], OAuthAuthorizationCode.prototype, "versioning", void 0);
OAuthAuthorizationCode = __decorate([
    (0, typeorm_1.Entity)()
], OAuthAuthorizationCode);
exports.OAuthAuthorizationCode = OAuthAuthorizationCode;
