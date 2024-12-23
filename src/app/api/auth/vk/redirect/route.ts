import { VK_CLIENT_ID, VK_REDIRECT_URI } from '@/shared/config';
import { NextResponse } from 'next/server';
import qs from 'querystring';

export const GET = async () => {
  const scope = 'email';
  const provider = 'vk';

  const params = qs.stringify({
    client_id: VK_CLIENT_ID,
    redirect_uri: VK_REDIRECT_URI,
    response_type: 'code',
    scope,
    access_type: 'offline',
    prompt: 'consent',
    state: provider,
  });

  const authUrl = `https://oauth.vk.com/authorize?${params}`;

  return NextResponse.redirect(authUrl);
};
