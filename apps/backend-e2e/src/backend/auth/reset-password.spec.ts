import { AxiosError, isAxiosError } from 'axios';
import { OK_RESPONSE, testUser } from 'common';

import { fetcher, refreshSchema } from '../../services';

beforeAll(async () => {
  await refreshSchema();
});

describe('POST /auth/reset-password', () => {
  const { password, newPassword, email } = testUser;
  it('should block request if old password is wrong', async () => {
    try {
      await fetcher.post(`/auth/reset-password`, {
        oldPassword: newPassword,
        password: newPassword,
        confirmPassword: newPassword,
      });
    } catch (e) {
      expect(e).toBeInstanceOf(AxiosError);
      if (isAxiosError(e)) {
        expect(e.response?.status).toBe(401);
      }
    }
  });

  it('should return ok message', async () => {
    const { data, status } = await fetcher.post(`/auth/reset-password`, {
      oldPassword: password,
      password: newPassword,
      confirmPassword: newPassword,
    });

    expect(status).toBe(200);
    expect(data).toEqual(OK_RESPONSE);
  });

  it('should success login after password was changed', async () => {
    const { data, status } = await fetcher.post(`/auth/sign-in`, {
      email,
      password: newPassword,
    });

    expect(status).toBe(200);
    expect(data).toEqual(OK_RESPONSE);
  });
});
