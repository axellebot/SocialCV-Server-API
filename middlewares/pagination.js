"use-strict";

/**
 * @param req
 * @return  A JSON object.
 */
module.exports = function (req, res, next) {
    var pagination = {};
    if (req.query.page && req.query.limit) {
        const page = req.query.page, limit = req.query.limit;

        if (page > 0 && limit > 0) {
            pagination.skip = (page - 1) * limit;
            pagination.limit = limit * 1;
        }
    }
    req.pagination = pagination;
    next();
};