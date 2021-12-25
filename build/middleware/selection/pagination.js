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
        // Pagination
        const offset = req.query.offset;
        const limit = req.query.limit;
        if (!offset && !limit)
            throw new error_1.QueryWrongCursorPaginationError();
        if (!(typeof offset === 'number' && typeof limit === 'number'))
            throw new error_1.QueryWrongCursorPaginationError('Pagination cursor must be a number.');
        if (offset < 0 || limit < 0)
            throw new error_1.QueryWrongCursorPaginationError('Pagination cursor must be >=0');
        logger_1.logger.info('Pagination : {', `offset: ${offset} ,`, `limit: ${limit} `, '}');
    }
    catch (error) {
        next(error);
    }
};
