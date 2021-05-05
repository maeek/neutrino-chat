import { Reducer } from 'redux';
import filtersReducerMock from './mock';
import { FilterCategory, FiltersAction, FiltersActionsEnum, FiltersState } from './types';

export const initialState: FiltersState = __DEV__ ? filtersReducerMock : {
  search: '',
  category: FilterCategory.ALL,
  group: '',
  queries: []
};

export const filters: Reducer<FiltersState, FiltersAction> = (state = initialState, action) => {
  switch (action.type) {
  case FiltersActionsEnum.SET_FILTER_SEARCH:
    return {
      ...state,
      search: action.data.search
    };

  case FiltersActionsEnum.SET_FILTER_MAIN:
    return {
      ...state,
      category: action.data.category
    };

  case FiltersActionsEnum.SET_FILTER_GROUP:
    return {
      ...state,
      group: action.data.group
    };

  case FiltersActionsEnum.SET_FILTER_CUST:
    return {
      ...state,
      queries: action.data.filters
    };

  default:
    return state;
  }
};

export default filters;
