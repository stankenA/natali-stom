import { ApiUser } from '@/shared/lib/types';
import api from '..';

export type AuthParams = {
  code: string;
  state: string;
};

export type GetUserInfoParams = {
  accessToken: string;
};

const authUser = ({ code, state }: AuthParams) =>
  api
    .get<{ accessToken: string }>('/api/auth/callback', { params: { code, state } })
    .then((res) => res.data);

const getGoogleUser = ({ accessToken }: GetUserInfoParams) =>
  api.get<ApiUser>('/api/auth/google/user', { params: { accessToken } }).then((res) => res.data);

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
  authUser,
  getGoogleUser,
  deleteAuthCookie,
  getVkUser,
};
