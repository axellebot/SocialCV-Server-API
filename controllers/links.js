"use strict";

var getOptionRemove = require("../helpers").getOptionRemove;

const Link = require('../models/link.schema');

const PARAM_ID = global.constants.PARAM.PARAM_ID_LINK;

/* Links page. */
exports.links = {};
exports.links.get = function (req, res, next) {
    //TODO : Links - Handle options
    Link
        .find({})
        .limit(req.options.pagination.limit)
        .skip(req.options.pagination.skip)
        .exec(function (err, links) {
            if (err) return next(new DatabaseFindError());
            res.json({data: links});
        });
};

exports.links.post = function (req, res, next) {
    //TODO : Links - Create link
    return next(new NotImplementedError("Create a new link"));
};

exports.links.put = function (req, res, next) {
    //TODO : Links - Add Bulk update
    return next(new NotImplementedError("Bulk update of links"));
};

exports.links.delete = function (req, res, next) {
    Link
        .remove()
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            return res.status(200).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};

/* Link page. */
exports.link = {};
exports.link.get = function (req, res, next) {
    Link
        .findById(req.params[PARAM_ID])
        .exec(function (err, link) {
            if (err) return next(new DatabaseFindError());
            res.json({data: link});
        });
};

exports.link.post = function (req, res, next) {
    return next(new NotFoundError());
};

exports.link.put = function (req, res, next) {
    //TODO : Link - Update link
    return next(new NotImplementedError("Update details of link " + req.params[PARAM_ID]));
};

exports.link.delete = function (req, res, next) {
    var optionRemove = getOptionRemove(req.params[PARAM_ID], req.decoded);
    Link
        .remove(optionRemove)
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            return res.status(200).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};