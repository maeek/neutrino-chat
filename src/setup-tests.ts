// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { DateTime } from 'luxon';

export const TIME_MOCK = '2021-01-30T18:05:38.652+01:00' as unknown as DateTime;

jest.mock('luxon', () => ({
  DateTime: {
    local: () => TIME_MOCK
  }
}));
