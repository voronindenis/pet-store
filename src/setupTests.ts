import '@testing-library/jest-dom';

import { server } from './api/mocks/server';

global.matchMedia = (query) => ({
  matches: true,
  media: query,
  onchange: null,
  addListener: jest.fn(), // deprecated
  removeListener: jest.fn(), // deprecated
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
});

// Establish API mocking before all tests.
beforeAll(() => {
  server.listen({
    onUnhandledRequest(req) {
      console.error(
        'Found an unhandled %s request to %s',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        `${req.method} ${req?.body?.operationName ?? ''}`,
        req.url.href,
      );
    },
  });
});
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  server.resetHandlers();
});
// Clean up after the tests are finished.
afterAll(() => {
  server.close();
});
