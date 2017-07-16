var getPagination = require("../../helpers").getPagination;

const LinkTag = require('../../models/linkTag.schema');

/* Links page. */
exports.get = function (req, res, next) {
    //TODO : LinkTags - Handle options
    var pagination = getPagination(req);
    LinkTag
        .find({user: req.params.id})
        .limit(pagination.limit)
        .skip(pagination.skip)
        .exec(function (err, linkTags) {
            if (err) return next(err);
            res.json({data: linkTags});
        });
};
exports.post = function (req, res, next) {
    //TODO : LinkTags - Create link for user
    res.status(404).send('Create a new LinkTag for user : '+req.params.id);
};
exports.put = function (req, res, next) {
    //TODO : LinkTags - Add Bulk update for user
    res.status(404).send('Bulk update of links for user : '+req.params.id);
};
exports.delete = function (req, res, next) {
    //TODO : LinkTags - Remove all links for user
    res.status(404).send('Remove all links for user : '+req.params.id);
};