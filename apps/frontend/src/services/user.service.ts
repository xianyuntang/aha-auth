import { GetUsersResponse } from 'common';

import { fetcher } from '../core';

export const getUsers = async (cursor?: string) => {
  try {
    const { data } = await fetcher.get<GetUsersResponse>('/users', {
      params: { cursor },
    });
    return data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
