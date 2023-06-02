import { rest } from 'msw';

import { IUser } from '../Api';

export const commonHandlers = [
  rest.get<object, object, string | { error: 'Unauthorized' }>('/api/v3/user/login', (req, res, ctx) => {
    if (req.url.searchParams.get('username') === 'admin' && req.url.searchParams.get('password') === 'password') {
      return res(ctx.status(200), ctx.json('Token'));
    } else {
      return res(ctx.status(401), ctx.json({ error: 'Unauthorized' }));
    }
  }),
  rest.post<IUser, object, string>('/api/v3/user', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json('Token'));
  }),
];
