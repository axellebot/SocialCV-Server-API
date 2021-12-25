/* eslint-disable no-undef */

import Api from './api';
import {} from './config';
import { logger } from './libs/logger';

logger.info(`[ENV_NAME = ${process.env.ENV_NAME}]`);
logger.info(`[LOG_LEVEL = ${process.env.LOG_LEVEL}]`);
logger.info(`[NODE_ENV = ${process.env.NODE_ENV}]`);
logger.info(`[SVC_PORT = ${process.env.PORT}]`);
logger.info(`[SVC_MOUNT_POINT = ${process.env.SVC_MOUNT_POINT}]`);

logger.info(`Starting app ...`);

const PORT: number = parseInt(process.env.PORT as string, 10);

const api = new Api(PORT);
api.listen();
