"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scope = void 0;
const typeorm_1 = require("typeorm");
const _1 = require(".");
const base_model_1 = require("./base.model");
// oauth_access_tokens:write oauth_access_tokens:read oauth_access_tokens:delete
// oauth_authorization_codes:write oauth_authorization_codes:read oauth_authorization_codes:delete
// oauth_clients:write oauth_clients:read oauth_clients:delete
// oauth_refresh_tokens:write oauth_refresh_tokens:read oauth_refresh_tokens:delete
// oauth_scopes:write oauth_scopes:read oauth_scopes:delete
// account:read
// entries:write entries:read entries:delete
// groups:write groups:read groups:delete
// parts:write parts:read parts:delete
// roles:write roles:read roles:delete
// profiles:write profiles:read profiles:delete
// users:write users:read users:delete
let Scope = class Scope extends base_model_1.Base {
};
__decorate([
    (0, typeorm_1.Column)()
], Scope.prototype, "scope", void 0);
__decorate([
    (0, typeorm_1.Column)()
], Scope.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => _1.Role, (role) => role.scopes)
], Scope.prototype, "roles", void 0);
Scope = __decorate([
    (0, typeorm_1.Entity)()
], Scope);
exports.Scope = Scope;
