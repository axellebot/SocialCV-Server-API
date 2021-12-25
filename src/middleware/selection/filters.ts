import { NextFunction, Request, Response } from 'express';
import { logger } from '../../libs/logger';

function parseValue(value: any, key: any, options = {}) {
  if (value.includes(',')) {
    return value
      .split(',')
      .map((arrayVal: any) => parseValue(arrayVal, key, options));
  }

  // Match type casting operators like string(true)
  const casters = { ...builtInCasters, ...options.casters };
  const casting = value.match(/^(\w+)\((.*)\)$/);
  if (casting && casters[casting[1]]) {
    return casters[casting[1]](casting[2]);
  }

  // Apply casters per params
  if (
    options.castParams &&
    options.castParams[key] &&
    casters[options.castParams[key]]
  ) {
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
  const isDate = value.match(
    /[12]\d{3}(-(0[1-9]|1[0-2])(-(0[1-9]|[12][0-9]|3[01]))?)(T| )?(([01][0-9]|2[0-3]):[0-5]\d(:[0-5]\d(\.\d+)?)?(Z|[+-]\d{2}:\d{2})?)?/
  );
  /* eslint-enable max-len */

  if (isDate) {
    return new Date(value);
  }

  return value;
}

// function parseOperator(operator?: string): string {
//   if (operator === '=') {
//     return '$eq';
//   } else if (operator === '!=') {
//     return '$ne';
//   } else if (operator === '>') {
//     return '$gt';
//   } else if (operator === '>=') {
//     return '$gte';
//   } else if (operator === '<') {
//     return '$lt';
//   } else if (operator === '<=') {
//     return '$lte';
//   }
//   return '$exists';
// }

interface FilterOption {
  blacklist?: string[];
  whitelist?: string[];
}

function parseFilter(params: any, options: FilterOption) {
  return Object.keys(params)
    .map((val: string) => {
      const join = params[val] ? `${val}=${params[val]}` : val;
      // Separate key, operators and value

      // Separate key, operators and value
      const result: string[] | null = join.match(
        /(!?)([^><!=]+)([><]=?|!?=|)(.*)/
      );

      const prefix: string | undefined = result?.at(1);
      const key: string | undefined = result?.at(2);
      const op: string | undefined = result?.at(3);
      const value: string | undefined = result?.at(4);

      return {
        prefix,
        key,
        op,
        value: parseValue(value, key, options),
      };
    })
    .filter(({ key }) => {
      if (key)
        if (options.whitelist) {
          return options.whitelist.indexOf(key) !== -1;
        } else if (options.blacklist) {
          return options.blacklist.indexOf(key) === -1;
        }
    })
    .reduce((result, { prefix, key, op, value }) => {
      if (key) {
        if (!result[key]) {
          result[key] = {};
        }

        if (Array.isArray(value)) {
          result[key][op === '$ne' ? '$nin' : '$in'] = value;
        } else if (op === '$exists') {
          result[key][op] = prefix !== '!';
        } else if (op === '$eq') {
          result[key] = value;
        } else if (op === '$ne' && typeof value === 'object') {
          result[key].$not = value;
        } else {
          result[key][op] = value;
        }

        return result;
      }
      return result;
    }, {});
}

/**
 * @param req
 * @param res
 * @param next
 */
export default async (req: Request, res: Response, next: NextFunction) => {
  logger.info('Filters : ', req.query.filters);

  req.query.filters = parseFilter(req.query, {
    blacklist: ['token', 'fields', 'sort', 'offset', 'limit'],
  } as FilterOption);

  next();
};
