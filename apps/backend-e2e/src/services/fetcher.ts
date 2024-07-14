import * as process from 'node:process';

import axios from 'axios';
import { AuthorizedUser, testUser } from 'common';
import jwt from 'jsonwebtoken';
import urljoin from 'url-join';

const baseUrl = process.env.SERVER_EXTERNAL_API_URL || '';
const prefix = process.env.SERVER_PREFIX || '';
const accessSecret = process.env.JWT_ACCESS_SECRET || '';

const { id, email } = testUser;

export const fetcher = axios.create({
  baseURL: urljoin(baseUrl, prefix),
  headers: {
    authorization: `Bearer ${jwt.sign(
      {
        user: {
          id,
          email,
        } as AuthorizedUser,
      },
      accessSecret
    )}`,
  },
});

export const publicFetcher = axios.create({
  baseURL: urljoin(baseUrl, prefix),
});
