import { createSelector } from 'reselect';
import { getStoreState } from '@/store';
import { ErrorsDisplayLocation } from '@/store/app/errors/types';

export const getErrors = (state = getStoreState()) => {
  return state.app.errors.list;
};

export const getErrorsIsVisible = (state = getStoreState()) => {
  return state.app.errors.visible;
};

export const getErrorById = (uuid: string) => createSelector(
  getErrors,
  (errors) => errors.filter((error) => error.uuid === uuid)
);

export const getErrorByType = (type: string) => createSelector(
  getErrors,
  (errors) => errors.filter((error) => error.type === type)
);

export const getErrorByLocation = (location: ErrorsDisplayLocation) => createSelector(
  getErrors,
  (errors) => errors.filter((error) => error.displayLocation.includes(location))
);

export const getNotViewedErrors = createSelector(
  getErrors,
  (errors) => errors.filter((error) => !error.viewed)
);

export const getViewedErrors = createSelector(
  getErrors,
  (errors) => errors.filter((error) => error.viewed)
);
