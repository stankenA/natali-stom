import { ApiUser, ApiGoogleUser, ApiVkUser, OAuthProviders } from '@/shared/lib/types';
import axios from 'axios';

export const getUserFromProvider = async (
  provider: OAuthProviders,
  accessToken: string,
): Promise<ApiUser> => {
  if (provider === 'google') {
    const user = await axios
      .get<ApiGoogleUser>('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => res.data);

    return {
      name: user.name,
      avatar: user.picture,
    };
  }

  if (provider === 'vk') {
    const { response } = await axios
      .get<{ response: ApiVkUser[] }>('https://api.vk.com/method/users.get', {
        params: {
          access_token: accessToken,
          v: '5.131',
          fields: 'first_name,last_name,photo_200',
        },
      })
      .then((res) => res.data);

    const user = response[0];

    if (!user) {
      throw new Error('Пользователь не найден');
    }

    return {
      name: `${user.first_name} ${user.last_name}`,
      avatar: user.photo_200,
    };
  }

  throw new Error('Неизвестный провайдер');
};
