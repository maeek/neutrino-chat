import { v4 as uuidv4 } from 'uuid';
import { ErrorsDisplayLocation } from './types';

export interface ErrorData {
  code?: string | number;
  [key: string]: any;
}

export const unifiedErrorTemplate = <T = string>(
  type: T,
  message: string,
  displayLocation: ErrorsDisplayLocation[] | null = [ ErrorsDisplayLocation.TOAST ],
  data?: ErrorData
) => ({
    uuid: uuidv4(),
    type,
    message,
    displayLocation,
    ...data
  });

export const createToastError = <T = string>(type: T, message: string, data?: ErrorData) => {
  return unifiedErrorTemplate(type, message, null, {
    ...data,
    displayLocation: data?.displayLocation
      ? [ ...data.displayLocation, ErrorsDisplayLocation.TOAST ]
      : [ ErrorsDisplayLocation.TOAST ]
  });
};
