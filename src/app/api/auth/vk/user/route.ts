import { ApiUser, ApiVkUser } from '@/shared/lib/types';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const accessToken = searchParams.get('accessToken');

  if (!accessToken) {
    return NextResponse.json({ error: 'Не указан токен юзера' }, { status: 400 });
  }

  try {
    const { response } = await axios
      .get<{
        response: ApiVkUser[];
      }>(`https://api.vk.com/method/users.get`, {
        params: {
          access_token: accessToken,
          v: '5.131',
          fields: 'first_name,last_name,photo_200',
        },
      })
      .then((res) => res.data);

    const user = response[0];

    if (!user) {
      return NextResponse.json({ error: 'Пользователь не найден' }, { status: 404 });
    }

    const formattedUser: ApiUser = {
      name: `${user.first_name} ${user.last_name}`,
      avatar: user.photo_200,
    };

    return NextResponse.json(formattedUser);
  } catch (error) {
    return NextResponse.json(
      { error: `Ошибка в получении данных о пользователе: ${error}` },
      { status: 500 },
    );
  }
};
