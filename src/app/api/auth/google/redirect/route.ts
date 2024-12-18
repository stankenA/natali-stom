import { GOOGLE_CLIENT_ID, GOOGLE_REDIRECT_URI } from '@/shared/config';
import { NextResponse } from 'next/server';

export const GET = async () => {
  const scope = 'openid profile email';

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=${scope}&access_type=offline&state=google`;

  return NextResponse.redirect(authUrl);
};
