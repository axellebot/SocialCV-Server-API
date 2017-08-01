const bodyData = require("./bodyData");

module.exports = [
    bodyData,
    function (req, res, next) {
        if (typeof req.body.data !== "object") return next(new WrondDataError());
        next()
    }];