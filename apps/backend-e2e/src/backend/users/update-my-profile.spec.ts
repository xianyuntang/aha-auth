import { OK_RESPONSE, UpdateMyProfileRequest } from 'common';

import { fetcher, refreshSchema } from '../../services';

beforeAll(async () => {
  await refreshSchema();
});

describe('POST /users/me', () => {
  it('should return ok message', async () => {
    const { data, status } = await fetcher.put(`/users/me`, {
      firstName: 'test',
      lastName: 'user',
    } as UpdateMyProfileRequest);

    expect(status).toBe(200);
    expect(data).toEqual(OK_RESPONSE);
  });
});
