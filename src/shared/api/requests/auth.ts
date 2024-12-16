import { ApiUser } from '@/shared/lib/types';
import axios from 'axios';

export type AuthWithGoogleParams = {
  code: string;
};

const authWithGoogle = ({ code }: AuthWithGoogleParams) =>
  axios
    .get<{ idToken: string; accessToken: string }>(`/api/auth/callback?code=${code}`)
    .then((res) => res.data);

const getGoogleUser = ({ authToken }: { authToken: string }) =>
  axios
    .get<ApiUser>('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then((res) => res.data);

const deleteAuthCookie = () => axios.post('/api/auth/logout');

export const authApi = {
  authWithGoogle,
  getGoogleUser,
  deleteAuthCookie,
};
