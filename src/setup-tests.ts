import '@testing-library/jest-dom';

Date.now = jest.fn(() => 123456789);

window.__DEMO__ = false;
window.__DEV__ = false;
global.__DEV__ = false;
