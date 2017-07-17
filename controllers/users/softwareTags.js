"use strict";

var getPagination = require("../../helpers").getPagination;

const SoftwareTag = require('../../models/softwareTag.schema');

const PARAM_ID = global.constants.PARAM.PARAM_ID_USER;

/* SoftwareTags page. */
exports.get = function (req, res, next) {
    //TODO : SoftwareTags - Handle options
    var pagination = getPagination(req);

    SoftwareTag
        .find({user: req.params[PARAM_ID]})
        .limit(pagination.limit)
        .skip(pagination.skip)
        .exec(function (err, SoftwareTags) {
            if (err) return next(err);
            res.json({data: SoftwareTags});
        });
};

exports.post = function (req, res, next) {
    //TODO : SoftwareTags - Create softwareTag for user
    res.status(404).send('Create a new SoftwareTag for user : ' + req.params[PARAM_ID]);
};
exports.put = function (req, res, next) {
    //TODO : SoftwareTags - Add Bulk update for user
    res.status(404).send('Bulk update of SoftwareTags for user : ' + req.params[PARAM_ID]);
};
exports.delete = function (req, res, next) {
    //TODO : SoftwareTags - Remove all softwareTags for user
    res.status(404).send('Remove all SoftwareTags for user : ' + req.params[PARAM_ID]);
};