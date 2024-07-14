import { Mutex } from 'async-mutex';
import axios from 'axios';
import { JwtTokenPayload } from 'common';
import dayjs from 'dayjs';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

import { authService } from '../services';
import { apiUrl } from './environment';

const mutex = new Mutex();

export const publicFetcher = axios.create({ baseURL: apiUrl });

export const fetcher = axios.create({ baseURL: apiUrl });

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
    if (accessToken) {
      await mutex.acquire();
      if (isAccessTokenNearExpired()) {
        const refreshToken = Cookies.get('refreshToken');
        if (!refreshToken) {
          throw Error('Invalid token');
        }
        const { accessToken } = await authService.refreshAccessToken(
          refreshToken
        );
        Cookies.set('accessToken', accessToken);
        config.headers.setAuthorization(`Bearer ${accessToken}`);
      } else {
        config.headers.setAuthorization(`Bearer ${accessToken}`);
      }
    }
    mutex.release();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

fetcher.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      location.replace('/sign-in');
    }
    return Promise.reject(error);
  }
);
