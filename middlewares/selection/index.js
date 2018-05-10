const parseQuerySelectionFields = require('@middlewares/selection/fields');
const parseQuerySelectionFilter = require('@middlewares/selection/filters');
const parseQuerySelectionPagination = require('@middlewares/selection/pagination');
const parseQuerySelectionSort = require('@middlewares/selection/sort');

module.exports= [parseQuerySelectionFields, parseQuerySelectionFilter, parseQuerySelectionPagination, parseQuerySelectionSort];
