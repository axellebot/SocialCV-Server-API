var getPagination = require("../../helpers").getPagination;

const Link = require('../../models/link.schema');

/* Links page. */
exports.get = function (req, res, next) {
    //TODO : Links - Handle options
    var pagination = getPagination(req);
    Link
        .find({user: req.params.id})
        .limit(pagination.limit)
        .skip(pagination.skip)
        .exec(function (err, links) {
            if (err) return next(err);
            res.json({data: links});
        });
};
exports.post = function (req, res, next) {
    //TODO : Links - Create link for user
    res.status(404).send('Create a new Link for user : '+req.params.id);
};
exports.put = function (req, res, next) {
    //TODO : Links - Add Bulk update for user
    res.status(404).send('Bulk update of links for user : '+req.params.id);
};
exports.delete = function (req, res, next) {
    //TODO : Links - Remove all links for user
    res.status(404).send('Remove all links for user : '+req.params.id);
};