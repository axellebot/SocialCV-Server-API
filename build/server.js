"use strict";
/* eslint-disable no-undef */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = __importDefault(require("./api"));
const logger_1 = require("./libs/logger");
logger_1.logger.info(`[ENV_NAME = ${process.env.ENV_NAME}]`);
logger_1.logger.info(`[LOG_LEVEL = ${process.env.LOG_LEVEL}]`);
logger_1.logger.info(`[NODE_ENV = ${process.env.NODE_ENV}]`);
logger_1.logger.info(`[SVC_PORT = ${process.env.PORT}]`);
logger_1.logger.info(`[SVC_MOUNT_POINT = ${process.env.SVC_MOUNT_POINT}]`);
logger_1.logger.info(`Starting app ...`);
const PORT = parseInt(process.env.PORT, 10);
const api = new api_1.default(PORT);
api.listen();
