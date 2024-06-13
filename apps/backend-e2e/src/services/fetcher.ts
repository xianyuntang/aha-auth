import * as process from 'node:process';

import axios from 'axios';
import urljoin from 'url-join';

const baseUrl = process.env.SERVER_EXTERNAL_URL || '';
const prefix = process.env.SERVER_PREFIX || '';

export const publicFetcher = axios.create({
  baseURL: urljoin(baseUrl, prefix),
});
