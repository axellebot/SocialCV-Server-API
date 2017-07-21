module.exports = function (req, res, next) {
    if (!req.body.data) return next(new MissingDataError);
    return next()
};