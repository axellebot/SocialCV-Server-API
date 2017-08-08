const bodyData = require("./data");

module.exports = [
    bodyData,
    function (req, res, next) {
        if (!Array.isArray(req.body.data)) return next(new WrondDataError());
        next()
    }];