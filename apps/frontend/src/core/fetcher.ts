import axios from 'axios';
import { JwtTokenPayload } from 'common';
import dayjs from 'dayjs';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

import { authService } from '../services';
import { apiUrl } from './environment';

export const publicFetcher = axios.create({ baseURL: apiUrl });

export const fetcher = axios.create({ baseURL: apiUrl });

export const setAccessToken = (accessToken: string) => {
  Cookies.set('accessToken', accessToken);
};

export const setRefreshToken = (refreshToken: string) => {
  Cookies.set('refreshToken', refreshToken);
};

const isAccessTokenNearExpired = () => {
  const accessToken = Cookies.get('accessToken');
  if (!accessToken) {
    return true;
  }
  const decodedJwtToken = jwt.decode(accessToken) as JwtTokenPayload;
  return decodedJwtToken.exp < dayjs().add(2, 'm').unix();
};

fetcher.interceptors.request.use(
  async (config) => {
    const accessToken = Cookies.get('accessToken');
    if (isAccessTokenNearExpired()) {
      const refreshToken = Cookies.get('refreshToken');
      if (!refreshToken) {
        throw Error('Invalid token');
      }
      const { accessToken } = await authService.refreshAccessToken(
        refreshToken
      );
      setAccessToken(accessToken);
    } else {
      config.headers.common['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
