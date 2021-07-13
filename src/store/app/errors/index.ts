import { Reducer } from 'redux';
import { ErrorsActions, ErrorsActionsEnum, ErrorsState } from './types';

export const initialState: ErrorsState = {
  list: [],
  visible: false
};

export const errors: Reducer<ErrorsState, ErrorsActions> = (state = initialState, action) => {
  switch (action.type) {
  case ErrorsActionsEnum.NEW_ERROR:
    return {
      ...state,
      list: [ ...state.list, action.data.errors ]
    };

  case ErrorsActionsEnum.ALTER_ERROR:
    return {
      ...state,
      list: [ ...state.list ].map((err) => {
        if (err.uuid === action.data.error.uuid) {
          err = {
            ...err,
            ...action.data.error
          };
        }
        return err;
      })
    };

  case ErrorsActionsEnum.CLEAR_ERROR:
    return {
      ...state,
      list: [ ...state.list ].filter((err) => !action.data.indexes.includes(err.uuid))
    };

  case ErrorsActionsEnum.CLEAR_ERRORS:
    return {
      ...state,
      list: [  ]
    };

  case ErrorsActionsEnum.TOGGLE_ERRORS_VISIBILITY:
    return {
      ...state,
      visible: !state.visible
    };

  default:
    return state;
  }
};

export default errors;
