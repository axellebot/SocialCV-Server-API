"use strict";

/**
 * @param req
 * @param res
 * @param next
 */
module.exports = function (req, res, next) {
    if (!req.queryParsed) req.queryParsed = {};
    if (!req.queryParsed.cursor) req.queryParsed.cursor = {};

    //Pagination
    const page = req.query.page, limit = req.query.limit;
    if (!page && !limit) return next(new WrongQueryCursorPaginationError());
    if (isNaN(page) || isNaN(limit)) return next(new WrongQueryCursorPaginationError("Pagination option must be a number."));
    if (page <= 0 || limit <= 0) return next(new WrongQueryCursorPaginationError("Pagniation option must be > 0"));
    req.queryParsed.cursor.skip = (page - 1) * limit;
    req.queryParsed.cursor.limit = limit * 1;

    console.log("Option Pagination", req.queryParsed.cursor.skip, req.queryParsed.cursor.limit);
    if (req.query.page) delete req.query.page;
    if (req.query.limit) delete req.query.limit;

    //Sort
    const sortString = req.query.sort;
    if (sortString) {
        if (typeof sortString !== "string") return next(new WrongQueryCursorSortError("Sort option must be a string."));
        req.queryParsed.cursor.sort = sortString.replace(',', ' ');
        console.log("Option Sort", req.queryParsed.cursor.sort);
        delete req.query.sort;
    }

    next();
};