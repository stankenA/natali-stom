import { VK_CLIENT_ID, VK_REDIRECT_URI } from '@/shared/config';
import { NextResponse } from 'next/server';

export const GET = async () => {
  const scope = 'email';

  const authUrl = `https://oauth.vk.com/authorize?client_id=${VK_CLIENT_ID}&redirect_uri=${VK_REDIRECT_URI}&response_type=code&scope=${scope}`;

  return NextResponse.redirect(authUrl);
};
