/**
 * @param req
 * @return  A JSON object.
 */
function getPagination(req) {
    var options = {};
    if (req.query.page && req.query.limit) {
        const page = req.query.page, limit = req.query.limit;

        if (page > 0 && limit > 0) {
            options.skip = (page - 1) * limit;
            options.limit = limit * 1;
        }
    }
    return options;
}

module.exports = {
    "getPagination": getPagination
};