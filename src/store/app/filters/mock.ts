import { FilterCategory, FiltersState } from './types';

export const filtersReducerMock: FiltersState = {
  category: FilterCategory.ALL,
  group: 'Starred',
  queries: [{
    fieldName: 'username',
    value: 'ma'
  }]
};

export default filtersReducerMock;
