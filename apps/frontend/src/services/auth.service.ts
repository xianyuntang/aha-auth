import {
  LocalSignInRequest,
  OK_RESPONSE,
  RefreshTokenRequest,
  RefreshTokenResponse,
} from 'common';
import urljoin from 'url-join';

import { apiUrl, publicFetcher } from '../core';

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
