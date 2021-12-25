"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rolesCtrl = exports.usersCtrl = exports.profilesCtrl = exports.partsCtrl = exports.oauthCtrl = exports.authenticationCtrl = exports.groupsCtrl = exports.entriesCtrl = exports.identityCtrl = void 0;
exports.identityCtrl = __importStar(require("./identity.controller"));
exports.entriesCtrl = __importStar(require("./entries.controller"));
exports.groupsCtrl = __importStar(require("./groups.controller"));
exports.authenticationCtrl = __importStar(require("./authentication.controller"));
exports.oauthCtrl = __importStar(require("./oauth.controller"));
exports.partsCtrl = __importStar(require("./parts.controller"));
exports.profilesCtrl = __importStar(require("./profiles.controller"));
exports.usersCtrl = __importStar(require("./users.controller"));
exports.rolesCtrl = __importStar(require("./roles.controller"));
