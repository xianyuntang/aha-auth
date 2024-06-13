import { AxiosError, isAxiosError } from 'axios';

import { publicFetcher, refreshSchema } from '../../services';

beforeAll(async () => {
  await refreshSchema();
});

describe('POST /auth/sing-in', () => {
  it('should block request if password and confirmPassword do not match', async () => {
    try {
      await publicFetcher.post(`/auth/sign-in`, {
        email: 'xt1800i@gmail.com',
        password: '1qaz@WSX',
      });
    } catch (e) {
      expect(e).toBeInstanceOf(AxiosError);
      if (isAxiosError(e)) {
        expect(e.response?.status).toBe(401);
      }
    }
  });

  it('should success login', async () => {
    await publicFetcher.post(`/auth/sign-up`, {
      email: 'xt1800i@gmail.com',
      password: '1qaz@WSX',
      confirmPassword: '1qaz@WSX',
    });
    const { data, status } = await publicFetcher.post(`/auth/sign-in`, {
      email: 'xt1800i@gmail.com',
      password: '1qaz@WSX',
    });

    expect(status).toBe(200);
    expect(data).toEqual({ message: 'ok' });
  });
});
