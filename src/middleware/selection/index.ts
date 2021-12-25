import parseQuerySelectionFields from './fields';
import parseQuerySelectionFilter from './filters';
import parseQuerySelectionPagination from './pagination';
import parseQuerySelectionSort from './sort';

const parseQuerySelection = [
  parseQuerySelectionFields,
  parseQuerySelectionFilter,
  parseQuerySelectionPagination,
  parseQuerySelectionSort,
];

export { parseQuerySelection };
