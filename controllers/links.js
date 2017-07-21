"use strict";

var getOptionRemove = require("../helpers").getOptionRemove;

const Link = require('../models/link.schema');

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
            res.status(HTTP_STATUS_OK).json({data: links});
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
            return res.status(HTTP_STATUS_OK).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};

/* Link page. */
exports.link = {};
exports.link.get = function (req, res, next) {
    Link
        .findById(req.params[PARAM_ID_LINK])
        .exec(function (err, link) {
            if (err) return next(new DatabaseFindError());
            if (!link) return next(new NotFoundError(MODEL_NAME_LINK));
            res.status(HTTP_STATUS_OK).json({data: link});
        });
};

exports.link.post = function (req, res, next) {
    return next(new NotFoundError());
};

exports.link.put = function (req, res, next) {
    //TODO : Link - Update link
    return next(new NotImplementedError("Update details of link " + req.params[PARAM_ID_LINK]));
};

exports.link.delete = function (req, res, next) {
    var optionRemove = getOptionRemove(req.params[PARAM_ID_LINK], req.decoded);
    Link
        .findOneAndRemove(optionRemove, function (err, link) {
            if (err) return next(new DatabaseRemoveError());
            if (!link) return next(new NotFoundError(MODEL_NAME_LINK));
            return res.status(HTTP_STATUS_OK).json({message: MESSAGE_SUCCESS_RESOURCE_DELETED, data: link});
        });
};