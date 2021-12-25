/* eslint-disable no-unused-vars */
'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleType = exports.Role = void 0;
const typeorm_1 = require("typeorm");
const _1 = require(".");
const base_model_1 = require("./base.model");
var RoleType;
(function (RoleType) {
    RoleType["admin"] = "ROLE_ADMIN";
    RoleType["member"] = "ROLE_MEMBER";
    RoleType["guest"] = "ROLE_GUEST";
})(RoleType || (RoleType = {}));
exports.RoleType = RoleType;
let Role = class Role extends base_model_1.Base {
};
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: RoleType,
        default: RoleType.guest,
    })
], Role.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => _1.Scope, (scope) => scope.roles),
    (0, typeorm_1.JoinTable)()
], Role.prototype, "scopes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => _1.User, (user) => user.role)
], Role.prototype, "users", void 0);
Role = __decorate([
    (0, typeorm_1.Entity)()
], Role);
exports.Role = Role;
