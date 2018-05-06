"use strict";

// Errors
const WrongQueryCursorPaginationError = require('../../errors/WrongQueryCursorPaginationError');
const WrongQueryCursorSortError = require('../../errors/WrongQueryCursorSortError');

/**
 * @param req
 * @param res
 * @param next
 */
module.exports = function (req, res, next) {
    req.queryParsed = req.queryParsed || {};
    req.queryParsed.cursor = req.queryParsed.cursor || {};

    //Pagination
    const page = req.query.page, limit = req.query.limit;
    if (!page && !limit) return next(new WrongQueryCursorPaginationError());
    if (isNaN(page) || isNaN(limit)) return next(new WrongQueryCursorPaginationError("Pagination cursor must be a number."));
    if (page <= 0 || limit <= 0) return next(new WrongQueryCursorPaginationError("Pagination cursor must be > 0"));
    req.queryParsed.cursor.skip = (page - 1) * limit;
    req.queryParsed.cursor.limit = limit * 1;

    console.log("Cursor Pagination", req.queryParsed.cursor.skip, req.queryParsed.cursor.limit);
    if (req.query.page) delete req.query.page;
    if (req.query.limit) delete req.query.limit;

    //Sort
    const sortString = req.query.sort;
    if (sortString) {
        if (typeof sortString !== "string") return next(new WrongQueryCursorSortError("Sort cursor must be a string."));
        req.queryParsed.cursor.sort = sortString.replace(',', ' ');
        console.log("Cursor Sort", req.queryParsed.cursor.sort);
        delete req.query.sort;
    }

    next();
};