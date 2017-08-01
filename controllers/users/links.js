"use strict";

var userCanEditUserData = require("../../helpers").userCanEditUserData;

const Link = require('../../models/link.schema');

/* Links page. */
exports.get = function (req, res, next) {
    //TODO : Links - Handle options
    Link
        .find({user: req.params[PARAM_ID_USER]})
        .limit(req.options.pagination.limit)
        .skip(req.options.pagination.skip)
        .exec(function (err, links) {
            if (err) return next(new DatabaseFindError());
            res.status(HTTP_STATUS_OK).json({data: links});
        });
};

exports.post = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.decoded, userId)) return next(new MissingPrivilegeError());
    //TODO : Links - Create link for user
    next(new NotImplementedError("Create a new link for user : " + req.params[PARAM_ID_USER]));
};

exports.put = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.decoded, userId)) return next(new MissingPrivilegeError());

    const links = req.body.data;
    var linksUpdated = [];
    Async.eachOf(links, function (link, key, callback) {
        const filterUpdate = {
            _id: link._id,
            user: userId
        };
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

exports.delete = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.decoded, userId)) return next(new MissingPrivilegeError());

    Link
        .remove({user: userId})
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            res.status(HTTP_STATUS_OK).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};