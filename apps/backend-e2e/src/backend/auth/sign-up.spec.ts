import { isAxiosError } from 'axios';
import { OK_RESPONSE, testUser } from 'common';

import { publicFetcher, refreshSchema } from '../../services';

beforeAll(async () => {
  await refreshSchema();
});

describe('POST /auth/sing-up', () => {
  const {
    email,
    longEmail,
    password,
    wrongPassword,
    simplePassword,
    longPassword,
  } = testUser;

  it('should block request if password and confirmPassword do not match', async () => {
    try {
      const { status } = await publicFetcher.post(`/auth/sign-up`, {
        email,
        password,
        confirmPassword: wrongPassword,
      });
      expect(status).not.toBe(200);
    } catch (e) {
      if (isAxiosError(e)) {
        expect(e.response?.status).toBe(400);
      } else {
        throw e;
      }
    }
  });

  it('should block request if password is too simple', async () => {
    try {
      const { status } = await publicFetcher.post(`/auth/sign-up`, {
        email,
        password: simplePassword,
        confirmPassword: simplePassword,
      });
      expect(status).not.toBe(200);
    } catch (e) {
      if (isAxiosError(e)) {
        expect(e.response?.status).toBe(400);
      } else {
        throw e;
      }
    }
  });

  it('should block request if password is too long', async () => {
    try {
      const { status } = await publicFetcher.post(`/auth/sign-up`, {
        email,
        password: longPassword,
        confirmPassword: longPassword,
      });
      expect(status).not.toBe(200);
    } catch (e) {
      if (isAxiosError(e)) {
        expect(e.response?.status).toBe(400);
      } else {
        throw e;
      }
    }
  });

  it('should block request if email is too long', async () => {
    try {
      const { status } = await publicFetcher.post(`/auth/sign-up`, {
        email: longEmail,
        password,
        confirmPassword: password,
      });
      expect(status).not.toBe(200);
    } catch (e) {
      if (isAxiosError(e)) {
        expect(e.response?.status).toBe(400);
      } else {
        throw e;
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
      const { status } = await publicFetcher.post(`/auth/sign-up`, {
        email,
        password: password,
        confirmPassword: password,
      });
      expect(status).not.toBe(200);
    } catch (e) {
      if (isAxiosError(e)) {
        expect(e.response?.status).toBe(409);
      } else {
        throw e;
      }
    }
  });
});
