import { rest } from 'msw';

import { IPet, IUser } from '../Api';

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
  rest.get<object, object, IPet[] | { error: 'Not Found' }>('/api/v3/pet/findByStatus', (req, res, ctx) => {
    const status = req.url.searchParams.get('status');
    const pendingPets: IPet[] = [
      { id: 1, name: 'Dog', status: 'pending', category: { id: 1, name: 'Animals' }, photoUrls: [], tags: [] },
      { id: 2, name: 'Cat', status: 'pending', category: { id: 2, name: 'Animals' }, photoUrls: [], tags: [] },
    ];
    const soldPets: IPet[] = [
      { id: 3, name: 'Pig', status: 'sold', category: { id: 1, name: 'Animals' }, photoUrls: [], tags: [] },
      { id: 4, name: 'Monkey', status: 'sold', category: { id: 2, name: 'Animals' }, photoUrls: [], tags: [] },
    ];
    if (status === 'pending') {
      return res(ctx.status(200), ctx.json(pendingPets));
    }
    if (status === 'sold') {
      return res(ctx.status(200), ctx.json(soldPets));
    }
    return res(ctx.status(404), ctx.json({ error: 'Not Found' }));
  }),
];
