"use strict";

const LinkTag = require('../../models/linkTag.schema');

const PARAM_ID = global.constants.PARAM.PARAM_ID_USER;

/* Links page. */
exports.get = function (req, res, next) {
    //TODO : LinkTags - Handle options
    LinkTag
        .find({user: req.params[PARAM_ID]})
        .limit(req.options.pagination.limit)
        .skip(req.options.pagination.skip)
        .exec(function (err, linkTags) {
            if (err) return next(err);
            res.json({data: linkTags});
        });
};
exports.post = function (req, res, next) {
    //TODO : LinkTags - Create link for user
    res.status(404).send('Create a new LinkTag for user : '+req.params[PARAM_ID]);
};
exports.put = function (req, res, next) {
    //TODO : LinkTags - Add Bulk update for user
    res.status(404).send('Bulk update of links for user : '+req.params[PARAM_ID]);
};
exports.delete = function (req, res, next) {
    //TODO : LinkTags - Remove all links for user
    res.status(404).send('Remove all links for user : '+req.params[PARAM_ID]);
};