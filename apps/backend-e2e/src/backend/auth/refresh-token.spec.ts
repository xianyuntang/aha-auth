import { isAxiosError } from 'axios';
import { RefreshTokenResponse, testToken } from 'common';

import { fetcher, refreshSchema } from '../../services';

beforeAll(async () => {
  await refreshSchema();
});

describe('POST /auth/refresh-token', () => {
  const { refreshToken, expiredRefreshToken } = testToken;
  it('should block request if refresh token was expired', async () => {
    try {
      await fetcher.post(`/auth/refresh-token`, {
        token: expiredRefreshToken,
      });
    } catch (e) {
      if (isAxiosError(e)) {
        expect(e.response?.status).toBe(401);
      }
    }
  });

  it('should get new access token if refresh token is valid', async () => {
    const { data, status } = await fetcher.post<RefreshTokenResponse>(
      `/auth/refresh-token`,
      {
        token: refreshToken,
      }
    );
    expect(status).toBe(200);
    expect(data).toHaveProperty('accessToken');
  });
});
