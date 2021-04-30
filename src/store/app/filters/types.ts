/* eslint-disable no-unused-vars */
import { Action } from 'redux';

export enum FilterCategory {
  ALL = 'all',
  CHANNEL = 'channel',
  DM = 'dm',
  CONTACT = 'contact'
}

export interface FilterQuery {
  fieldName: string; // reference filter config
  value: any;
}

export interface FiltersState {
  category: FilterCategory;
  group: string;
  queries: FilterQuery[];
}

export enum FiltersActionsEnum {
  SET_FILTER_MAIN = 'SET_FILTER_MAIN',
  SET_FILTER_CUST =  'SET_FILTER_CUST',
  SET_FILTER_GROUP =  'SET_FILTER_GROUP'
}

export interface SetFilterMain extends Action {
  type: FiltersActionsEnum.SET_FILTER_MAIN,
  data: {
    category: FilterCategory;
  }
}

export interface SetFilterCustom extends Action {
  type: FiltersActionsEnum.SET_FILTER_CUST,
  data: {
    filters: FilterQuery[];
  }
}

export interface SetFilterGroup extends Action {
  type: FiltersActionsEnum.SET_FILTER_GROUP,
  data: {
    group: string;
  }
}

export type FiltersAction = SetFilterCustom | SetFilterGroup | SetFilterMain;
