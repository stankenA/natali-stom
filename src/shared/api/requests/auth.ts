import { ApiUser, OAuthProviders } from '@/shared/lib/types';
import api from '..';

export type AuthParams = {
  code: string;
  state: string;
};

export type GetUserInfoParams = {
  accessToken: string;
  provider: OAuthProviders;
};

const authUser = ({ code, state }: AuthParams) =>
  api
    .get<{ accessToken: string; provider: string }>('/api/auth/callback', {
      params: { code, state },
    })
    .then((res) => res.data);

const getUserInfo = ({ accessToken, provider }: GetUserInfoParams) =>
  api
    .get<ApiUser>('/api/auth/user-info', { params: { accessToken, provider } })
    .then((res) => res.data);

const deleteAuthCookie = () => api.post('/api/auth/logout');

export const authApi = {
  authUser,
  deleteAuthCookie,
  getUserInfo,
};
