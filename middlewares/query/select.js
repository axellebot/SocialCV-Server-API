"use strict";

/**
 * @param req
 * @param res
 * @param next
 */
module.exports = function (req, res, next) {
    if (!req.queryParsed) req.queryParsed = {};
    if (!req.queryParsed.select) req.queryParsed.select = {};

    var fields = req.query.field;
    if (fields) {
        req.queryParsed.select = fields.replace(',', ' ');
        console.log("Select ", req.queryParsed.select);
        delete req.query.field;
    }

    next();
};