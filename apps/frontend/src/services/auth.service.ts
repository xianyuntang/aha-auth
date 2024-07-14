import { isAxiosError } from 'axios';
import {
  LocalSignInRequest,
  LocalSignUpRequest,
  OK_RESPONSE,
  RefreshTokenRequest,
  RefreshTokenResponse,
  ResetPasswordRequest,
  SignInResponse,
} from 'common';
import urljoin from 'url-join';

import { apiUrl, fetcher, publicFetcher } from '../core';

export const signIn = async (email: string, password: string) => {
  try {
    const { data } = await publicFetcher.post<SignInResponse>('/auth/sign-in', {
      email,
      password,
    } as LocalSignInRequest);

    return data;
  } catch (e) {
    if (isAxiosError(e)) {
      console.error(e.response?.data);
    }
    throw e;
  }
};

export const signUp = async (
  email: string,
  password: string,
  confirmPassword: string
) => {
  try {
    const { data } = await publicFetcher.post<typeof OK_RESPONSE>(
      '/auth/sign-up',
      { email, password, confirmPassword } as LocalSignUpRequest
    );

    return data;
  } catch (e) {
    if (isAxiosError(e)) {
      console.error(e.response?.data);
    }
    throw e;
  }
};

export const getGoogleSignInUrl = () => {
  return urljoin(apiUrl, 'auth', 'sign-in', 'google');
};

export const refreshAccessToken = async (token: string) => {
  try {
    const { data } = await publicFetcher.post<RefreshTokenResponse>(
      '/auth/refresh-token',
      { token } as RefreshTokenRequest
    );

    return data;
  } catch (e) {
    if (isAxiosError(e)) {
      console.error(e.response?.data);
    }
    throw e;
  }
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
    if (isAxiosError(e)) {
      console.error(e.response?.data);
    }
    throw e;
  }
};
