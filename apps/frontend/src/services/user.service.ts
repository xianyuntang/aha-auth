import {
  GetMeResponse,
  GetUsersResponse,
  OK_RESPONSE,
  UpdateMyProfileRequest,
} from 'common';

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

export const getMe = async () => {
  try {
    const { data } = await fetcher.get<GetMeResponse>('/users/me', {});
    return data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const updateMe = async (firstName: string, lastName: string) => {
  try {
    const { data } = await fetcher.put<typeof OK_RESPONSE>('/users/me', {
      firstName,
      lastName,
    } as UpdateMyProfileRequest);
    return data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
