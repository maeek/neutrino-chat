import { ActionCreator  } from 'redux';
import { AddNewError, AlterError, ClearError, ClearErrors, ErrorEntry, ErrorsActionsEnum } from './types';

export const addNewError: ActionCreator<AddNewError> = (errors: ErrorEntry) => ({
  type: ErrorsActionsEnum.NEW_ERROR,
  data: {
    errors
  }
});

export const clearError: ActionCreator<ClearError> = (errorIndexes: string[]) => ({
  type: ErrorsActionsEnum.CLEAR_ERROR,
  data: {
    indexes: errorIndexes
  }
});

export const clearErrors: ActionCreator<ClearErrors> = () => ({
  type: ErrorsActionsEnum.CLEAR_ERRORS,
  data: {}
});

export const alterError: ActionCreator<AlterError> = (uuid: string, data: {}) => ({
  type: ErrorsActionsEnum.ALTER_ERROR,
  data: {
    error: {
      uuid,
      ...data
    }
  }
});
