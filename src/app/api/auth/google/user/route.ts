import { ApiGoogleUser, ApiUser } from '@/shared/lib/types';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const accessToken = searchParams.get('accessToken');

  if (!accessToken) {
    return NextResponse.json({ error: 'Не указан токен юзера' }, { status: 400 });
  }

  try {
    const user = await axios
      .get<ApiGoogleUser>('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => res.data);

    const formattedUser: ApiUser = {
      name: user.name,
      avatar: user.picture,
    };

    return NextResponse.json(formattedUser);
  } catch (error) {
    return NextResponse.json(
      { error: `Ошибка в получении данных о пользователе: ${error}` },
      { status: 500 },
    );
  }
};
