import { ApiUser } from '@/shared/lib/types';
import axios from 'axios';
import api from '..';

export type AuthParams = {
  code: string;
};

export type GetUserInfoParams = {
  accessToken: string;
};

const authWithGoogle = ({ code }: AuthParams) =>
  api
    .get<{ idToken: string; accessToken: string }>('/api/auth/google/callback', {
      params: { code },
    })
    .then((res) => res.data);

const getGoogleUser = ({ accessToken }: GetUserInfoParams) =>
  axios
    .get<ApiUser>('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => res.data);

const authWithVk = ({ code }: AuthParams) =>
  api
    .get<{ accessToken: string; userId: string }>('/api/auth/vk/callback', { params: { code } })
    .then((res) => res.data);

const getVkUser = ({ accessToken }: GetUserInfoParams) =>
  api
    .get<ApiUser>('/api/auth/vk/user', {
      params: {
        accessToken,
      },
    })
    .then((res) => res.data);

const deleteAuthCookie = () => api.post('/api/auth/logout');

export const authApi = {
  authWithGoogle,
  getGoogleUser,
  deleteAuthCookie,
  authWithVk,
  getVkUser,
};
