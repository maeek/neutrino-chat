import { ActionCreator } from 'redux';
import { FiltersActionsEnum, SetFilterCustom, SetFilterGroup, SetFilterMain, SetFilterSearch } from './types';

export const setFilterSearch: ActionCreator<SetFilterSearch> = (search) => ({
  type: FiltersActionsEnum.SET_FILTER_SEARCH,
  data: {
    search
  }
});

export const setFilterMain: ActionCreator<SetFilterMain> = (category) => ({
  type: FiltersActionsEnum.SET_FILTER_MAIN,
  data: {
    category
  }
});

export const setFilterGroup: ActionCreator<SetFilterGroup> = (group) => ({
  type: FiltersActionsEnum.SET_FILTER_GROUP,
  data: {
    group
  }
});

export const setFilterCust: ActionCreator<SetFilterCustom> = (filters) => ({
  type: FiltersActionsEnum.SET_FILTER_CUST,
  data: {
    filters
  }
});
