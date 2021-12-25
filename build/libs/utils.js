"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshTokenExpiration = exports.generateAccessTokenExpiration = exports.generateCode = exports.generateToken = void 0;
const uid_1 = require("uid");
const uuid_1 = require("uuid");
function generateToken() {
    return (0, uuid_1.v4)();
}
exports.generateToken = generateToken;
function generateCode() {
    return (0, uid_1.uid)(16);
}
exports.generateCode = generateCode;
function generateAccessTokenExpiration() {
    return new Date(Date.now() + process.env.ACCESS_TOKEN_EXP * 1000);
}
exports.generateAccessTokenExpiration = generateAccessTokenExpiration;
function generateRefreshTokenExpiration() {
    return new Date(Date.now() + process.env.REFRESH_TOKEN_EXP * 1000);
}
exports.generateRefreshTokenExpiration = generateRefreshTokenExpiration;
