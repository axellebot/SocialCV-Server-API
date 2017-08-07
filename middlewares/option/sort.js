"use-strict";

/**
 * @param req
 * @param res
 * @param next
 */
module.exports = function (req, res, next) {
    if (!req.options) req.options = {};
    const optionSort = req.query.optionSort;
    if (optionSort) {
        if (typeof optionSort !== "string") return next(new WrongOptionSortError("Sort option must be a string."));
        req.options.sort = optionSort;
        //TODO : Delete sort console log
        console.log("Option Sort", req.options.sort);
        delete req.query.optionSort;
    }
    next();
};

/* Exemple : (http://mongoosejs.com/docs/api.html#sort)
query.sort('field -test');
 */