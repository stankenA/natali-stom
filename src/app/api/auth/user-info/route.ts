import { NextRequest, NextResponse } from 'next/server';
import { getUserFromProvider } from './lib';
import { OAuthProviders } from '@/shared/lib/types';

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const accessToken = searchParams.get('accessToken');
  const provider = searchParams.get('provider') as OAuthProviders;

  if (!accessToken || !provider) {
    return NextResponse.json({ error: 'Не указан токен юзера или провайдер' }, { status: 400 });
  }

  try {
    const user = await getUserFromProvider(provider, accessToken);
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: `Ошибка в получении данных о пользователе: ${error}` },
      { status: 500 },
    );
  }
};
