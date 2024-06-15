import {
  LocalSignInRequest,
  OK_RESPONSE,
  RefreshTokenRequest,
  RefreshTokenResponse,
  ResetPasswordRequest,
} from 'common';
import urljoin from 'url-join';

import { apiUrl, fetcher, publicFetcher } from '../core';

export const signIn = async (email: string, password: string) => {
  const { data } = await publicFetcher.post<typeof OK_RESPONSE>(
    '/auth/sign-in',
    { email, password } as LocalSignInRequest
  );

  return data;
};

export const getGoogleSignInUrl = () => {
  return urljoin(apiUrl, 'auth', 'sign-in', 'google');
};

export const refreshAccessToken = async (token: string) => {
  const { data } = await publicFetcher.post<RefreshTokenResponse>(
    '/auth/refresh-token',
    { token } as RefreshTokenRequest
  );

  return data;
};

export const resetPassword = async (
  oldPassword: string,
  password: string,
  confirmPassword: string
) => {
  try {
    const { data } = await fetcher.post<typeof OK_RESPONSE>(
      '/auth/reset-password',
      {
        oldPassword,
        password,
        confirmPassword,
      } as ResetPasswordRequest
    );
    return data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
