import { ApiUser } from '@/shared/lib/types';
import axios from 'axios';

export type AuthParams = {
  code: string;
};

export type GetUserInfoParams = {
  accessToken: string;
};

const authWithGoogle = ({ code }: AuthParams) =>
  axios
    .get<{ idToken: string; accessToken: string }>(`/api/auth/google/callback?code=${code}`)
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
  axios
    .get<{ accessToken: string; userId: string }>(`/api/auth/vk/callback?code=${code}`)
    .then((res) => res.data);

// const getVkUser = ({ accessToken }: GetUserInfoParams) =>
//   axios.get(`/api/auth/vk/user-info?token=${accessToken}`).then((res) => res.data);

const deleteAuthCookie = () => axios.post('/api/auth/logout');

export const authApi = {
  authWithGoogle,
  getGoogleUser,
  deleteAuthCookie,
  authWithVk,
  // getVkUser,
};
