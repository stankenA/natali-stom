import { GOOGLE_CLIENT_ID, GOOGLE_REDIRECT_URI } from '@/shared/config';
import { NextResponse } from 'next/server';
import qs from 'querystring';

export const GET = async () => {
  const scope = 'openid profile email';
  const provider = 'google';

  const params = qs.stringify({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: GOOGLE_REDIRECT_URI,
    response_type: 'code',
    scope,
    access_type: 'offline',
    prompt: 'consent',
    state: provider,
  });

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;

  return NextResponse.redirect(authUrl);
};
