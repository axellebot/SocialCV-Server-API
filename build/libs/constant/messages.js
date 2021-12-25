"use strict";
/* eslint-disable no-unused-vars */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Messages = void 0;
// Messages
var Messages;
(function (Messages) {
    // APP Error
    Messages["MESSAGE_ERROR_APP"] = "Error application";
    Messages["MESSAGE_ERROR_WRONG_QUERY"] = "Wrong query.";
    Messages["MESSAGE_ERROR_NOT_FOUND"] = "Not found.";
    Messages["MESSAGE_ERROR_NOT_IMPLEMENTED"] = "Feature not implemented yet.";
    // Access Token
    Messages["MESSAGE_ERROR_ACCESS_TOKEN_MISSING_PRIVILEGE"] = "Access Token missing privilege";
    Messages["MESSAGE_ERROR_TOKEN_EXPIRED"] = "Token expired";
    // Authorization Code
    Messages["MESSAGE_ERROR_AUTHORIZATION_CODE_EXPIRED"] = "Authorization code expired";
    // Body
    Messages["MESSAGE_ERROR_BODY_WRONG_DATA"] = "Wrong data.";
    Messages["MESSAGE_ERROR_BODY_MISSING_DATA"] = "Missing data.";
    Messages["MESSAGE_ERROR_BODY_MISSING_TOKEN"] = "Missing Token.";
    // Resource Success
    Messages["MESSAGE_SUCCESS_RESOURCE_DELETED"] = "Resource deleted.";
    Messages["MESSAGE_SUCCESS_RESOURCE_UPDATED"] = "Resource updated.";
    Messages["MESSAGE_SUCCESS_RESOURCE_CREATED"] = "Resource created.";
    // Resource Error
    Messages["MESSAGE_ERROR_RESOURCE_DELETE"] = "Error deleting resource";
    Messages["MESSAGE_ERROR_RESOURCE_UPDATE"] = "Error updating resource";
    Messages["MESSAGE_ERROR_RESOURCES_PARTIAL_UPDATE"] = "Resources partially updated";
    Messages["MESSAGE_ERROR_RESOURCES_PARTIAL_DELETE"] = "Resources partially deleted";
    // Database Error
    Messages["MESSAGE_ERROR_DATABASE_COUNT"] = "Database count action error.";
    Messages["MESSAGE_ERROR_DATABASE_CREATE"] = "Database create action error.";
    Messages["MESSAGE_ERROR_DATABASE_SAVE"] = "Database save action error.";
    Messages["MESSAGE_ERROR_DATABASE_REMOVE"] = "Database remove action error.";
    Messages["MESSAGE_ERROR_DATABASE_FIND"] = "Database find action error.";
    // User Error
    Messages["MESSAGE_ERROR_USER_DISABLED"] = "User account disabled.";
    Messages["MESSAGE_ERROR_USER_EMAIL_ADDRESS_ALREADY_EXIST"] = "E-mail already in use.";
    Messages["MESSAGE_ERROR_USER_MISSING"] = "User missing.";
    Messages["MESSAGE_ERROR_USER_MISSING_PRIVILEGE"] = "User missing privilege";
    Messages["MESSAGE_ERROR_USER_MISSING_EMAIL_ADDRESS"] = "Missing email address";
    Messages["MESSAGE_ERROR_USER_MISSING_FULL_NAME"] = "Missing full name";
    Messages["MESSAGE_ERROR_USER_MISSING_PASSWORD"] = "Missing password";
    Messages["MESSAGE_ERROR_USER_NOT_FOUND"] = "User not found";
    Messages["MESSAGE_ERROR_USER_WRONG_PASSWORD"] = "User wrong password";
    // Client Error
    Messages["MESSAGE_ERROR_CLIENT_MISSING"] = "Client missing";
    Messages["MESSAGE_ERROR_CLIENT_MISSING_GRANT_TYPE"] = "Client missing grant type";
    Messages["MESSAGE_ERROR_CLIENT_MISSING_PRIVILEGE"] = "Client missing privilege";
    Messages["MESSAGE_ERROR_CLIENT_WRONG_CREDENTIALS"] = "Client wrong credentials";
    Messages["MESSAGE_ERROR_ACCESS_RESTRICTED"] = "Access Restricted.";
    Messages["MESSAGE_ERROR_MISSING_PRIVILEGE"] = "Not enough privileges.";
    Messages["MESSAGE_ERROR_PROVIDING_TOKEN"] = "Can't provide token.";
    Messages["MESSAGE_ERROR_FAILED_AUTHENTICATION_TOKEN"] = "Failed to authenticate token.";
    Messages["MESSAGE_ERROR_EXPIRED_AUTHENTICATION_TOKEN"] = "Expired token.";
    // Cursor
    Messages["MESSAGE_ERROR_CURSOR_WRONG_SORT"] = "Cursor : wrong sort option.";
    Messages["MESSAGE_ERROR_CURSOR_WRONG_PAGINATION"] = "Cursor : wrong pagination option.";
    // Protocols
    Messages["MESSAGE_ERROR_PROTOCOL_WRONG"] = "Wrong protocol";
})(Messages = exports.Messages || (exports.Messages = {}));
