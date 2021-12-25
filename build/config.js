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
/* eslint-disable no-undef */
const dotenv = __importStar(require("dotenv"));
// eslint-disable-next-line no-undef
dotenv.config({ path: `../.env.${process.env.NODE_ENV}` });
// Loading process.env as ENV interface
const getConfig = () => {
    return {
        NODE_ENV: process.env.NODE_ENV,
        PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
        SECRET: process.env.SECRET,
        SALT_WORK_FACTOR: process.env.SALT_WORK_FACTOR
            ? Number(process.env.SALT_WORK_FACTOR)
            : undefined,
        DB_URI: process.env.DB_URI,
        DB_USERNAME: process.env.DB_USERNAME,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_NAME: process.env.DB_NAME,
        ACCESS_TOKEN_EXP: process.env.ACCESS_TOKEN_EXP
            ? Number(process.env.ACCESS_TOKEN_EXP)
            : undefined,
        REFRESH_TOKEN_EXP: process.env.REFRESH_TOKEN_EXP
            ? Number(process.env.REFRESH_TOKEN_EXP)
            : undefined,
    };
};
// Throwing an Error if any field was undefined we don't
// want our app to run if it can't connect to DB and ensure
// that these fields are accessible. If all is good return
// it as Config which just removes the undefined from our type
// definition.
const getSanitzedConfig = (config) => {
    for (const [key, value] of Object.entries(config)) {
        if (value === undefined) {
            throw new Error(`Missing key ${key} in config.env`);
        }
    }
    return {
        env: config.NODE_ENV,
        port: config.PORT,
        secret: config.SECRET,
        saltWorkFactor: config.SALT_WORK_FACTOR,
        databaseUri: config.DB_URI,
        databaseUsername: config.DB_USERNAME,
        databasePassword: config.DB_PASSWORD,
        databaseName: config.DB_NAME,
        accessTokenExp: config.ACCESS_TOKEN_EXP,
        refreshTokenExp: config.REFRESH_TOKEN_EXP,
    };
};
const envConfig = getConfig();
const sanitizedConfig = getSanitzedConfig(envConfig);
exports.default = sanitizedConfig;
