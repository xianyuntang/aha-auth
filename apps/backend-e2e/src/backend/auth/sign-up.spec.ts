import { AxiosError, isAxiosError } from 'axios';

import { publicFetcher, refreshSchema } from '../../services';

beforeAll(async () => {
  await refreshSchema();
});

describe('POST /auth/sing-up', () => {
  it('should block request if password and confirmPassword do not match', async () => {
    try {
      await publicFetcher.post(`/auth/sign-up`, {
        email: 'xt1800i@gmail.com',
        password: '1qaz@WSX',
        confirmPassword: '1qaz123',
      });
    } catch (e) {
      expect(e).toBeInstanceOf(AxiosError);
      if (isAxiosError(e)) {
        expect(e.response?.status).toBe(400);
      }
    }
  });

  it('should block request if password is too simple', async () => {
    try {
      await publicFetcher.post(`/auth/sign-up`, {
        email: 'xt1800i@gmail.com',
        password: '1qaz123',
        confirmPassword: '1qaz123',
      });
    } catch (e) {
      expect(e).toBeInstanceOf(AxiosError);
      if (isAxiosError(e)) {
        expect(e.response?.status).toBe(400);
      }
    }
  });

  it('should return a ok message', async () => {
    const res = await publicFetcher.post(`/auth/sign-up`, {
      email: 'xt1800i@gmail.com',
      password: '1qaz@WSX',
      confirmPassword: '1qaz@WSX',
    });

    expect(res.status).toBe(200);
    expect(res.data).toEqual({ message: 'ok' });
  });

  it('should return conflict', async () => {
    try {
      await publicFetcher.post(`/auth/sign-up`, {
        email: 'xt1800i@gmail.com',
        password: '1qaz@WSX',
        confirmPassword: '1qaz@WSX',
      });
    } catch (e) {
      expect(e).toBeInstanceOf(AxiosError);
      if (isAxiosError(e)) {
        expect(e.response?.status).toBe(409);
      }
    }
  });
});
