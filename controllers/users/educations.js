"use strict";

const Education = require('../../models/education.schema');

const PARAM_ID = global.constants.PARAM.PARAM_ID_USER;

/* Educations page. */
exports.get = function (req, res, next) {
    //TODO : Educations - Handle options
    Education
        .find({user: req.params[PARAM_ID]})
        .limit(req.options.pagination.limit)
        .skip(req.options.pagination.skip)
        .exec(function (err, educations) {
            if (err) return next(err);
            res.json({data: educations});
        });
};
exports.post = function (req, res, next) {
    //TODO : Educations - Create education for user
    res.status(404).send('Create a new Education for user : '+req.params[PARAM_ID]);
};
exports.put = function (req, res, next) {
    //TODO : Educations - Add Bulk update for user
    res.status(404).send('Bulk update of educations for user : '+req.params[PARAM_ID]);
};
exports.delete = function (req, res, next) {
    Education
        .remove({user: req.params[PARAM_ID]})
        .exec(function (err, removed) {
            if (err) return next(err);
            return res.status(200).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};