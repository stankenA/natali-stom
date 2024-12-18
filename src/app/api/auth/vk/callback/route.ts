import qs from 'querystring';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { VK_CLIENT_ID, VK_CLIENT_SECRET, VK_REDIRECT_URI } from '@/shared/config';

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'Не указан авторизационный код' }, { status: 400 });
  }

  try {
    const tokenResponse = await axios.post<{ access_token: string; user_id: string }>(
      'https://id.vk.com/oauth2/auth',
      qs.stringify({
        code,
        client_id: VK_CLIENT_ID,
        client_secret: VK_CLIENT_SECRET,
        redirect_uri: VK_REDIRECT_URI,
      }),
    );

    console.log(tokenResponse);

    const { access_token, user_id } = tokenResponse.data;

    const response = NextResponse.json({ accessToken: access_token, userId: user_id });

    response.cookies.set('authToken', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 15,
      path: '/',
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: `Ошибка в обмене кода на токен: ${error}` }, { status: 500 });
  }
};
