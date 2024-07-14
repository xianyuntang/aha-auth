import { isAxiosError } from 'axios';
import { testUser } from 'common';

import { publicFetcher, refreshSchema } from '../../services';

beforeAll(async () => {
  await refreshSchema();
});

describe('POST /auth/sing-in', () => {
  const { email, password, wrongPassword } = testUser;
  it('should block request if password and confirmPassword do not match', async () => {
    try {
      await publicFetcher.post(`/auth/sign-in`, {
        email,
        password: wrongPassword,
      });
    } catch (e) {
      if (isAxiosError(e)) {
        expect(e.response?.status).toBe(401);
      }
    }
  });

  it('should block login request if email is not verified.', async () => {
    try {
      await publicFetcher.post(`/auth/sign-in`, {
        email,
        password,
      });
    } catch (e) {
      if (isAxiosError(e)) {
        expect(e.response?.status).toBe(403);
      }
    }
  });

  it('should success login', async () => {
    const { data, status } = await publicFetcher.post(`/auth/sign-in`, {
      email,
      password,
    });

    expect(status).toBe(200);
    expect(data).toHaveProperty('accessToken');
    expect(data).toHaveProperty('refreshToken');
  });
});
