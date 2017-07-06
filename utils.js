/**
 * @param req
 * @return  A JSON object.
 */
function getPagination(req) {
    var options = {};
    if (req.query.page && req.query.per_page) {
        const page = req.query.page, per_page = req.query.per_page;

        if (page > 0 && per_page > 0) {
            options.skip = (page - 1) * per_page;
            options.limit = per_page * 1;
        }
    }
    return options;
}

module.exports = {
    "getPagination": getPagination
};