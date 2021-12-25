/* eslint-disable no-unused-vars */
'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntryType = exports.Entry = void 0;
const typeorm_1 = require("typeorm");
const _1 = require(".");
const base_model_1 = require("./base.model");
var EntryType;
(function (EntryType) {
    EntryType["map"] = "ENTRY_TYPE_MAP";
    EntryType["event"] = "ENTRY_TYPE_EVENT";
    EntryType["tag"] = "ENTRY_TYPE_TAG";
})(EntryType || (EntryType = {}));
exports.EntryType = EntryType;
let Entry = class Entry extends base_model_1.Base {
};
__decorate([
    (0, typeorm_1.Column)()
], Entry.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)()
], Entry.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.Group, (group) => group.entries)
], Entry.prototype, "group", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true })
], Entry.prototype, "ownerId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.User, (user) => user.profiles)
], Entry.prototype, "owner", void 0);
Entry = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.TableInheritance)({ column: { type: 'varchar', name: 'type' } })
], Entry);
exports.Entry = Entry;
