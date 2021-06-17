import { FilterCategory, FiltersState } from './types';

export const filtersReducerMock: FiltersState = {
  search: '',
  category: FilterCategory.ALL,
  group: '',
  queries: []
};

export default filtersReducerMock;
