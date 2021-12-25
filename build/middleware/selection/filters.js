"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../../libs/logger");
function parseValue(value, key, options = {}) {
    if (value.includes(',')) {
        return value
            .split(',')
            .map((arrayVal) => parseValue(arrayVal, key, options));
    }
    // Match type casting operators like string(true)
    const casters = { ...builtInCasters, ...options.casters };
    const casting = value.match(/^(\w+)\((.*)\)$/);
    if (casting && casters[casting[1]]) {
        return casters[casting[1]](casting[2]);
    }
    // Apply casters per params
    if (options.castParams &&
        options.castParams[key] &&
        casters[options.castParams[key]]) {
        return casters[options.castParams[key]](value);
    }
    // Match regex operators like /foo_\d+/i
    const regex = value.match(/^\/(.*)\/(i?)$/);
    if (regex) {
        return new RegExp(regex[1], regex[2]);
    }
    // Match boolean values
    if (value === 'true') {
        return true;
    }
    if (value === 'false') {
        return false;
    }
    // Match null
    if (value === 'null') {
        return null;
    }
    // Match numbers (string padded with zeros are not numbers)
    if (typeof value === 'number' && !/^0[0-9]+/.test(value)) {
        return Number(value);
    }
    // Match YYYY-MM-DDTHH:mm:ssZ format dates
    /* eslint-disable max-len */
    const isDate = value.match(/[12]\d{3}(-(0[1-9]|1[0-2])(-(0[1-9]|[12][0-9]|3[01]))?)(T| )?(([01][0-9]|2[0-3]):[0-5]\d(:[0-5]\d(\.\d+)?)?(Z|[+-]\d{2}:\d{2})?)?/);
    /* eslint-enable max-len */
    if (isDate) {
        return new Date(value);
    }
    return value;
}
function getFilter(params, options) {
    return Object.keys(params)
        .map((val) => {
        const join = params[val] ? `${val}=${params[val]}` : val;
        // Separate key, operators and value
        // Separate key, operators and value
        const result = join.match(/(!?)([^><!=]+)([><]=?|!?=|)(.*)/);
        const prefix = result?.at(1);
        const key = result?.at(2);
        const op = result?.at(3);
        const value = result?.at(4);
        return {
            prefix,
            key,
            op,
            value: parseValue(value, key, options),
        };
    })
        .filter(({ key }) => options.blacklist.indexOf(key) === -1 &&
        (!options.whitelist || options.whitelist.indexOf(key) !== -1))
        .reduce((result, { prefix, key, op, value }) => {
        if (!result[key]) {
            result[key] = {};
        }
        if (Array.isArray(value)) {
            result[key][op === '$ne' ? '$nin' : '$in'] = value;
        }
        else if (op === '$exists') {
            result[key][op] = prefix !== '!';
        }
        else if (op === '$eq') {
            result[key] = value;
        }
        else if (op === '$ne' && typeof value === 'object') {
            result[key].$not = value;
        }
        else {
            result[key][op] = value;
        }
        return result;
    }, {});
}
/**
 * @param req
 * @param res
 * @param next
 */
exports.default = async (req, res, next) => {
    logger_1.logger.info('Filters : ', req.query.filters);
    req.query.filters = getFilter(req.query, {
        blacklist: ['token', 'fields', 'sort', 'offset', 'limit'],
    });
    next();
};
