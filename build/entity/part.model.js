/* eslint-disable no-unused-vars */
'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartType = exports.Part = void 0;
const typeorm_1 = require("typeorm");
const _1 = require(".");
const base_model_1 = require("./base.model");
var PartType;
(function (PartType) {
    PartType["listHorizontal"] = "PART_TYPE_LIST_HORIZONTAL";
    PartType["listVertical"] = "PART_TYPE_LIST_VERTICAL";
})(PartType || (PartType = {}));
exports.PartType = PartType;
let Part = class Part extends base_model_1.Base {
};
__decorate([
    (0, typeorm_1.Column)()
], Part.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)()
], Part.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)()
], Part.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.Profile, (profile) => profile.parts)
], Part.prototype, "profile", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => _1.Group, (group) => group.part)
], Part.prototype, "groups", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true })
], Part.prototype, "ownerId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.User, (user) => user.parts)
], Part.prototype, "owner", void 0);
Part = __decorate([
    (0, typeorm_1.Entity)()
], Part);
exports.Part = Part;
