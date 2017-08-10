"use strict";

var getFilterEditData = require("../helpers").getFilterEditData;

const Link = require('../models/link.schema');

/* Links page. */
exports.links = {};
exports.links.get = function (req, res, next) {
    Link
        .find(req.queryParsed.filter)
        .select(req.queryParsed.select)
        .limit(req.queryParsed.cursor.limit)
        .skip(req.queryParsed.cursor.skip)
        .sort(req.queryParsed.cursor.sort)
        .exec(function (err, links) {
            if (err) return next(new DatabaseFindError());
            res.status(HTTP_STATUS_OK).json({data: links});
        });
};

exports.links.post = function (req, res, next) {
    //TODO : Links - Create link
    next(new NotImplementedError("Create a new link"));
};

exports.links.put = function (req, res, next) {
    const links = req.body.data;
    var linksUpdated = [];
    Async.eachOf(links, function (link, key, callback) {
        const filterUpdate = getFilterEditData(link._id, req.decoded);
        Link
            .findOneAndUpdate(filterUpdate, link, {new: true}, function (err, linkUpdated) {
                if (err) return callback(err);
                if (linkUpdated) linksUpdated.push(linkUpdated);
                callback();
            });
    }, function (err) {
        if (err && linksUpdated.length === 0) return next(new DatabaseUpdateError());
        if (err && linksUpdated.length > 0) {
            return res
                .status(HTTP_STATUS_INTERNAL_SERVER_ERROR)
                .json({
                    error: true,
                    message: MESSAGE_ERROR_RESOURCES_PARTIAL_UPDATE,
                    data: linksUpdated
                });
        }

        res
            .status(HTTP_STATUS_OK)
            .json({
                message: MESSAGE_ERROR_RESOURCES_PARTIAL_UPDATE,
                data: linksUpdated
            });
    });
};

exports.links.delete = function (req, res, next) {
    Link
        .remove()
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            res.status(HTTP_STATUS_OK).json({error: false, message: `${JSON.parse(removed).n} deleted`});
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

exports.link.put = function (req, res, next) {
    var filterUpdate = getFilterEditData(req.params[PARAM_ID_LINK], req.decoded);
    Link
        .findOneAndUpdate(filterUpdate, req.body.data, {new: true}, function (err, link) {
            if (err) return next(new DatabaseUpdateError());
            if (!link) return next(new NotFoundError(MODEL_NAME_LINK));
            res.status(HTTP_STATUS_OK).json({message: MESSAGE_SUCCESS_RESOURCE_UPDATED, data: link});
        });
};

exports.link.delete = function (req, res, next) {
    var filterRemove = getFilterEditData(req.params[PARAM_ID_LINK], req.decoded);
    Link
        .findOneAndRemove(filterRemove, function (err, link) {
            if (err) return next(new DatabaseRemoveError());
            if (!link) return next(new NotFoundError(MODEL_NAME_LINK));
            res.status(HTTP_STATUS_OK).json({message: MESSAGE_SUCCESS_RESOURCE_DELETED, data: link});
        });
};