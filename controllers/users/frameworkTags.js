var getPagination = require("../../helpers").getPagination;

const FrameworkTag = require('../../models/frameworkTag.schema');

/* FrameworkTags page. */
exports.get = function (req, res, next) {
    //TODO : FrameworkTags - Handle options
    var pagination = getPagination(req);

    FrameworkTag
        .find({user: req.params.id})
        .limit(pagination.limit)
        .skip(pagination.skip)
        .exec(function (err, FrameworkTags) {
            if (err) return next(err);
            res.json({data: FrameworkTags});
        });
};
exports.post = function (req, res, next) {
    //TODO : FrameworkTags - Create frameworkTag for user
    res.status(404).send('Create a new FrameworkTag for user : '+req.params.id);
};
exports.put = function (req, res, next) {
    //TODO : FrameworkTags - Add Bulk update for user
    res.status(404).send('Bulk update of frameworkTags for user : '+req.params.id);
};
exports.delete = function (req, res, next) {
    //TODO : FrameworkTags - Remove all frameworkTags for user
    res.status(404).send('Remove all frameworkTags for user : '+req.params.id);
};