var getPagination = require("../helpers").getPagination;

const ProjectTag = require('../models/projectTag.schema');

/* ProjectTags page. */
exports.projectTags = {};
exports.projectTags.get = function (req, res, next) {
    //TODO : ProjectTags - Handle options
    var pagination = getPagination(req);

    ProjectTag
        .find({})
        .limit(pagination.limit)
        .skip(pagination.skip)
        .exec(function (err, ProjectTags) {
            if (err) return next(err);
            res.json({data: ProjectTags});
        });
};
exports.projectTags.post = function (req, res, next) {
    //TODO : ProjectTags - Create projectTag
    res.status(404).send('Create a ProjectTag');
};
exports.projectTags.put = function (req, res, next) {
    //TODO : ProjectTags - Add Bulk update
    res.status(404).send('Bulk update of projectTags');
};
exports.projectTags.delete = function (req, res, next) {
    //TODO : ProjectTags - Remove all projectTags
    res.status(404).send('Remove all projectTags');
};

/* ProjectTag page. */
const FRAMEWORK_TAG_ID = "id";
exports.projectTag = {};

exports.projectTag.get = function (req, res, next) {
    ProjectTag
        .findById(req.params[FRAMEWORK_TAG_ID])
        .exec(function (err, ProjectTag) {
            if (err) return next(err);
            res.json({data: ProjectTag});
        });
};
exports.projectTag.post = function (req, res, next) {
    res.sendStatus(403);
};
exports.projectTag.put = function (req, res, next) {
    //TODO : ProjectTag - Update projectTag
    res.status(404).send('Bulk update of projectTags');
};
exports.projectTag.delete = function (req, res, next) {
    //TODO : ProjectTag - Remove projectTag
    res.status(404).send('Remove projectTag');
};