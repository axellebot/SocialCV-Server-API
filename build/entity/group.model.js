'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupType = exports.Group = void 0;
const typeorm_1 = require("typeorm");
const _1 = require(".");
const base_model_1 = require("./base.model");
var GroupType;
(function (GroupType) {
    GroupType["listHorizontal"] = "GROUP_TYPE_LIST_HORIZONTAL";
    GroupType["listVertical"] = "GROUP_TYPE_LIST_VERTICAL";
    GroupType["gridHorizontal"] = "GROUP_TYPE_GRID_HORIZONTAL";
    GroupType["gridVertical"] = "GROUP_TYPE_GRID_VERTICAL";
})(GroupType || (GroupType = {}));
exports.GroupType = GroupType;
let Group = class Group extends base_model_1.Base {
};
__decorate([
    (0, typeorm_1.Column)()
], Group.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: GroupType,
    })
], Group.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)()
], Group.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.Part, (part) => part.groups)
], Group.prototype, "part", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => _1.Entry, (entry) => entry.group)
], Group.prototype, "entries", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true })
], Group.prototype, "ownerId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.User, (user) => user.groups)
], Group.prototype, "owner", void 0);
Group = __decorate([
    (0, typeorm_1.Entity)()
], Group);
exports.Group = Group;
