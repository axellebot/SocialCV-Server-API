/* eslint-disable no-unused-vars */
'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileType = exports.Profile = void 0;
const typeorm_1 = require("typeorm");
const _1 = require(".");
const base_model_1 = require("./base.model");
var ProfileType;
(function (ProfileType) {
    ProfileType["main"] = "PROFILE_TYPE_MAIN";
    ProfileType["header"] = "PROFILE_TYPE_HEADER_MAIN";
    ProfileType["side"] = "PROFILE_TYPE_MAIN_SIDE";
})(ProfileType || (ProfileType = {}));
exports.ProfileType = ProfileType;
let Profile = class Profile extends base_model_1.Base {
};
__decorate([
    (0, typeorm_1.Column)()
], Profile.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)()
], Profile.prototype, "subtitle", void 0);
__decorate([
    (0, typeorm_1.Column)()
], Profile.prototype, "picture", void 0);
__decorate([
    (0, typeorm_1.Column)()
], Profile.prototype, "cover", void 0);
__decorate([
    (0, typeorm_1.Column)()
], Profile.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => _1.Part, (part) => part.profile)
], Profile.prototype, "parts", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true })
], Profile.prototype, "ownerId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.User, (user) => user.profiles)
], Profile.prototype, "owner", void 0);
Profile = __decorate([
    (0, typeorm_1.Entity)()
], Profile);
exports.Profile = Profile;
