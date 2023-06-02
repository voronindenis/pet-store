import { initialize, mswDecorator } from 'msw-storybook-addon';

import { browserHandlers } from '../src/api/mocks/browserHandlers';

// Initialize MSW
initialize();

// Provide the MSW addon decorator globally
export const decorators = [mswDecorator];

export const parameters = {
  msw: {
    handlers: browserHandlers,
  },
};
