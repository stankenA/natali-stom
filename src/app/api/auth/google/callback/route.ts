import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import qs from 'querystring';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI } from '@/shared/config';

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'Не указан авторизационный код' }, { status: 400 });
  }

  try {
    // Отправка запроса на получение токена
    const tokenResponse = await axios.post<{ id_token: string; access_token: string }>(
      'https://oauth2.googleapis.com/token',
      qs.stringify({
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: GOOGLE_REDIRECT_URI,
        grant_type: 'authorization_code',
      }),
    );

    const { id_token, access_token } = tokenResponse.data;

    const response = NextResponse.json({ idToken: id_token, accessToken: access_token });

    response.cookies.set('accessToken', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60,
      path: '/',
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: `Ошибка в обмене кода на токен: ${error}` }, { status: 500 });
  }
};
