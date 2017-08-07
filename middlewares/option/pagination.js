"use-strict";

/**
 * @param req
 * @param res
 * @param next
 */
module.exports = function (req, res, next) {
    if (!req.options) req.options = {};
    var optionPagination = {};
    const page = req.query.optionPage, limit = req.query.optionLimit;

    if (!page && !limit) return next(new WrongOptionPaginationError());
    if (isNaN(page) || isNaN(limit)) return next(new WrongOptionPaginationError("Pagination option must be a number."));
    if (page <= 0 || limit <= 0) return next(new WrongOptionPaginationError("Pagniation option must be > 0"));

    optionPagination.skip = (page - 1) * limit;
    optionPagination.limit = limit * 1;

    req.options.pagination = optionPagination;

    //TODO : Delete pagination console log
    console.log("Option Pagination", req.options.pagination);

    if (req.query.optionPage) delete req.query.optionPage;
    if (req.query.optionLimit) delete req.query.optionLimit;
    next();
};