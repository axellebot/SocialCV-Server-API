'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const typeorm_1 = require("typeorm");
const _1 = require(".");
const logger_1 = require("../libs/logger");
const base_model_1 = require("./base.model");
const oauth_1 = require("./oauth");
// -------------------------------------------
// User Schema
// -------------------------------------------
let User = class User extends base_model_1.Base {
    // -------------------------------------------
    // User ORM Methods (don't use ES function)
    // -------------------------------------------
    // // Add save middleware to salt password
    // UserSchema.pre('save', function(next) {
    //   var user = this;
    //   // only hash the password if it has been modified (or is new)
    //   if (!user.isModified('password')) return next();
    //   // generate a salt
    //   bcrypt.genSalt(config.saltWorkFactor, (err, salt) => {
    //     if (err) return next(new Error(err));
    //     // hash the password using our new salt
    //     bcrypt.hash(user.password, salt, (err, hash) => {
    //       if (err) return next(new Error(err));
    //       // override the cleartext password with the hashed one
    //       user.password = hash;
    //       next();
    //     });
    //   });
    // }
    /**
     * Add method to verify the password
     */
    async verifyPassword(candidatePassword) {
        logger_1.logger.info('UserSchema:verifyPassword', this.passwordMethod);
        if (this.passwordMethod === 'bcrypt')
            return await bcrypt_1.default.compare(candidatePassword, this.password);
        return candidatePassword === this.password;
    }
    /**
     * publicData
     *
     * return User public data object
     */
    publicData() {
        return {
            id: this.id,
            email: this.email,
            username: this.username,
            role: this.role,
            disabled: this.disabled,
            profiles: this.profiles,
            picture: this.picture,
        };
    }
    /**
     * getScopes
     *
     * return array of strings scope
     */
    async getScopes() {
        return this.role?.scopes;
    }
    /**
     * verifyScopes
     *
     * Check scopes
     */
    async verifyScopes(scopes) {
        const userScopes = await this.getScopes();
        for (const scope of scopes) {
            if (!userScopes?.includes(scope))
                return false;
        }
        return true;
    }
};
__decorate([
    (0, typeorm_1.Column)()
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)()
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)()
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)()
], User.prototype, "passwordMethod", void 0);
__decorate([
    (0, typeorm_1.Column)()
], User.prototype, "disabled", void 0);
__decorate([
    (0, typeorm_1.Column)()
], User.prototype, "picture", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => _1.Profile, (profile) => profile.owner)
], User.prototype, "profiles", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => _1.Part, (photo) => photo.owner)
], User.prototype, "parts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => _1.Group, (group) => group.owner)
], User.prototype, "groups", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => _1.Entry, (entry) => entry.owner)
], User.prototype, "entries", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true })
], User.prototype, "roleId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.Role, (role) => role.users)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => oauth_1.OAuthClient, (client) => client.owner)
], User.prototype, "oauthClients", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => oauth_1.OAuthAccessToken, (token) => token.user)
], User.prototype, "oauthAccessTokens", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => oauth_1.OAuthAccessToken, (token) => token.user)
], User.prototype, "oauthRefreshTokens", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => oauth_1.OAuthAuthorizationCode, (authCode) => authCode.user)
], User.prototype, "oauthAuthorizationCode", void 0);
User = __decorate([
    (0, typeorm_1.Entity)()
], User);
exports.User = User;
