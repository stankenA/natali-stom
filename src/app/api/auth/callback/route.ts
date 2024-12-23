import { NextRequest, NextResponse } from 'next/server';
import { exchangeCodeForToken } from './lib';

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const provider = searchParams.get('state');

  if (!code || !provider) {
    return NextResponse.json(
      { error: 'Не указан авторизационный код или провайдер' },
      { status: 400 },
    );
  }

  if (provider === 'vk' || provider === 'google') {
    try {
      const res = await exchangeCodeForToken(provider, code);
      return res;
    } catch (error) {
      return NextResponse.json(
        { error: `Ошибка в обмене кода на токен: ${error}` },
        { status: 500 },
      );
    }
  } else {
    return NextResponse.json({ error: 'Указанный провайдер не поддерживается' });
  }
};
