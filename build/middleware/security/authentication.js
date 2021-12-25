"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuthentication = void 0;
const passport_1 = __importDefault(require("passport"));
const error_1 = require("../../libs/error");
const logger_1 = require("../../libs/logger");
/**
 * @param options
 */
const requireAuthentication = (options = {}) => [
    passport_1.default.authenticate(['bearer', 'oauth2-client-password'], {
        session: false,
    }),
    async (req, res, next) => {
        try {
            logger_1.logger.info('authInfo', req.authInfo);
            if (options.scopes) {
                if (!req.authInfo.scopes) {
                    if (req.user) {
                        throw new error_1.UserMissingPrivilegeError();
                    }
                    else {
                        throw new error_1.ClientMissingPrivilegeError();
                    }
                }
                for (const scope of options.scopes) {
                    if (!req.authInfo.scopes.includes(scope)) {
                        if (req.user) {
                            throw new error_1.UserMissingPrivilegeError();
                        }
                        else {
                            throw new error_1.ClientMissingPrivilegeError();
                        }
                    }
                }
            }
            next();
        }
        catch (err) {
            next(err);
        }
    },
];
exports.requireAuthentication = requireAuthentication;
