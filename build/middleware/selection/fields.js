'use strict';
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
        logger_1.logger.info('Fields : ', req.query.fields);
        req.query.fields = req.query.fields || ''; // fields selected or all fields
        const fieldsString = req.query.fields;
        if (typeof fieldsString !== 'string')
            throw new error_1.ApiError();
        req.query.fields = fieldsString.replace(',', ' ');
        next();
    }
    catch (error) {
        next(error);
    }
};
