const parseQuerySelectionFields = require('./fields');
const parseQuerySelectionFilter = require('./filters');
const parseQuerySelectionPagination = require('./pagination');
const parseQuerySelectionSort = require('./sort');

module.exports= [parseQuerySelectionFields, parseQuerySelectionFilter, parseQuerySelectionPagination, parseQuerySelectionSort];
