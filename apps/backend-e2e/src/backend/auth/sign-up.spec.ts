import { AxiosError, isAxiosError } from 'axios';
import { OK_RESPONSE, testUser } from 'common';

import { publicFetcher, refreshSchema } from '../../services';

beforeAll(async () => {
  await refreshSchema();
});

describe('POST /auth/sing-up', () => {
  const { email, password, wrongPassword, simplePassword } = testUser;

  it('should block request if password and confirmPassword do not match', async () => {
    try {
      await publicFetcher.post(`/auth/sign-up`, {
        email,
        password,
        confirmPassword: wrongPassword,
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
        email,
        password: simplePassword,
        confirmPassword: simplePassword,
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
      password,
      confirmPassword: password,
    });

    expect(res.status).toBe(200);
    expect(res.data).toEqual(OK_RESPONSE);
  });

  it('should return conflict', async () => {
    try {
      await publicFetcher.post(`/auth/sign-up`, {
        email,
        password: password,
        confirmPassword: password,
      });
    } catch (e) {
      expect(e).toBeInstanceOf(AxiosError);
      if (isAxiosError(e)) {
        expect(e.response?.status).toBe(409);
      }
    }
  });
});
