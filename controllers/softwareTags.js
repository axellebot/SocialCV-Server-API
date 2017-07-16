var getPagination = require("../helpers").getPagination;

const SoftwareTag = require('../models/softwareTag.schema');

/* SoftwareTags page. */
exports.softwareTags = {};
exports.softwareTags.get = function (req, res, next) {
    //TODO : SoftwareTags - Handle options
    var pagination = getPagination(req);

    SoftwareTag
        .find({})
        .limit(pagination.limit)
        .skip(pagination.skip)
        .exec(function (err, SoftwareTags) {
            if (err) return next(err);
            res.json({data: SoftwareTags});
        });
};
exports.softwareTags.post = function (req, res, next) {
    //TODO : SoftwareTags - Create softwareTag
    res.status(404).send('Create a new SoftwareTag');
};
exports.softwareTags.put = function (req, res, next) {
    //TODO : SoftwareTags - Add Bulk update
    res.status(404).send('Bulk update of SoftwareTags');
};
exports.softwareTags.delete = function (req, res, next) {
    //TODO : SoftwareTags - Remove all softwareTags
    res.status(404).send('Remove all SoftwareTags');
};

/* SoftwareTag page. */
exports.softwareTag = {};
exports.softwareTag.get = function (req, res, next) {
    SoftwareTag
        .findById(req.params.id)
        .exec(function (err, SoftwareTag) {
            if (err) return next(err);
            res.json({data: SoftwareTag});
        });
};
exports.softwareTag.post = function (req, res, next) {
    res.sendStatus(403);
};
exports.softwareTag.put = function (req, res, next) {
    //TODO : SoftwareTag - Update softwareTag
    res.status(404).send('Update details of softwareTag');
};
exports.softwareTag.delete = function (req, res, next) {
    //TODO : SoftwareTag - Remove softwareTag
    res.status(404).send('Remove softwareTag');
};