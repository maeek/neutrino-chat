import { Action } from 'redux';

export enum ErrorsDisplayLocation {
  DRAWER = 'DRAWER',
  OVERLAY = 'OVERLAY',
  TOAST = 'TOAST'
}

export interface ErrorEntry<T = string> {
  uuid: string;
  type: T;
  displayLocation: ErrorsDisplayLocation[];
  message: string;
  code?: string | number;
  viewed?: boolean;
  [key: string]: any;
}

export interface ErrorsState {
  list: ErrorEntry[];
  visible: boolean;
}

export enum ErrorsActionsEnum {
  NEW_ERROR = 'NEW_ERROR',
  CLEAR_ERROR = 'CLEAR_ERROR',
  CLEAR_ERRORS = 'CLEAR_ERRORS',
  ALTER_ERROR = 'ALTER_ERROR',
  TOGGLE_ERRORS_VISIBILITY = 'TOGGLE_ERRORS_VISIBILITY'
}

export interface AddNewError extends Action {
  type: ErrorsActionsEnum.NEW_ERROR;
  data: {
    errors: ErrorEntry;
  }
}

export interface ClearError extends Action {
  type: ErrorsActionsEnum.CLEAR_ERROR;
  data: {
    indexes: string[];
  }
}

export interface ClearErrors extends Action {
  type: ErrorsActionsEnum.CLEAR_ERRORS;
  data: {}
}

export interface ToggleErrorsVisibility extends Action {
  type: ErrorsActionsEnum.TOGGLE_ERRORS_VISIBILITY;
  data: {}
}

export interface AlterError extends Action {
  type: ErrorsActionsEnum.ALTER_ERROR;
  data: {
    error: {
      uuid: string;
      [key: string]: any;
    }
  }
}

export type ErrorsActions = AddNewError | ClearError | ClearErrors | AlterError | ToggleErrorsVisibility;
