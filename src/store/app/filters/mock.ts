import { FilterCategory, FiltersState } from './types';

export const filtersReducerMock: FiltersState = {
  search: '',
  category: FilterCategory.ALL,
  group: 'Starred',
  queries: [ {
    fieldName: 'username',
    value: 'ma'
  } ]
};

export default filtersReducerMock;
