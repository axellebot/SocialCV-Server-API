"use strict";

var getPagination = require("../../helpers").getPagination;

const Software = require('../../models/software.schema');

const PARAM_ID = global.constants.PARAM.PARAM_ID_USER;

/* Softwares page. */
exports.get = function (req, res, next) {
    //TODO : Softwares - Handle options
    var pagination = getPagination(req);
    Software
        .find({user: req.params[PARAM_ID]})
        .limit(pagination.limit)
        .skip(pagination.skip)
        .exec(function (err, softwares) {
            if (err) return next(err);
            res.json({data: softwares});
        });
};
exports.post = function (req, res, next) {
    //TODO : Softwares - Create software for user
    res.status(404).send('Create a new Software for user : ' + req.params[PARAM_ID]);
};
exports.put = function (req, res, next) {
    //TODO : Softwares - Add Bulk update for user
    res.status(404).send('Bulk update of softwares for user : ' + req.params[PARAM_ID]);
};
exports.delete = function (req, res, next) {
    //TODO : Softwares - Remove all softwares for user
    res.status(404).send('Remove all softwares for user : ' + req.params[PARAM_ID]);
};