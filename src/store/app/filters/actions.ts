import { ActionCreator } from 'redux';
import { FiltersActionsEnum, SetFilterCustom, SetFilterGroup, SetFilterMain } from './types';

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
