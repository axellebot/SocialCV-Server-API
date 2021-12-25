"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const config_1 = __importDefault(require("./config"));
const connection = await (0, typeorm_1.createConnection)({
    type: 'postgres',
    host: 'localhost',
    port: 3306,
    username: config_1.default.databaseUsername,
    password: config_1.default.databasePassword,
    database: config_1.default.databaseName,
});
exports.default = connection;
