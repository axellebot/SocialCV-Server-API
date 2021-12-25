"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../../libs/error");
const logger_1 = require("../../libs/logger");
/**
 * @param req
 * @param res
 * @param next
 */
exports.default = async (req, res, next) => {
    try {
        logger_1.logger.info('Sort : ', req.query.sort);
        const sortString = req.query.sort || '';
        if (typeof sortString !== 'string')
            throw new error_1.ApiError();
        req.query.sort = sortString.replace(',', ' ');
        next();
    }
    catch (error) {
        next(error);
    }
};
