"use-strict";

/**
 * @param req
 * @param res
 * @param next
 */
module.exports = function (req, res, next) {
    if (!req.options) req.options = {};
    var optionPagination = {};
    if (req.query.page && req.query.limit) {
        const page = req.query.page, limit = req.query.limit;

        if (page > 0 && limit > 0) {
            optionPagination.skip = (page - 1) * limit;
            optionPagination.limit = limit * 1;
        }
    }
    req.options.pagination = optionPagination;
    next();
};