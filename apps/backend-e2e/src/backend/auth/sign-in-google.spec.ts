import { isAxiosError } from 'axios';

import { publicFetcher, refreshSchema } from '../../services';

beforeAll(async () => {
  await refreshSchema();
});

describe('GET /auth/sing-in/google', () => {
  it('should get redirect url in location header', async () => {
    try {
      await publicFetcher.get<string>(`/auth/sign-in/google`, {
        maxRedirects: 0,
      });
    } catch (e) {
      if (isAxiosError(e)) {
        expect(e.response?.status).toBe(302);
        expect(e.response?.headers).toHaveProperty('location');
      }
    }
  });

  it('should return a html page', async () => {
    const { status } = await publicFetcher.get<string>(`/auth/sign-in/google`);

    expect(status).toBe(200);
  });
});
