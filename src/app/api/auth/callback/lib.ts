import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI,
  VK_CLIENT_ID,
  VK_CLIENT_SECRET,
  VK_REDIRECT_URI,
} from '@/shared/config';
import { OAuthProviders } from '@/shared/lib/types';
import axios from 'axios';
import { NextResponse } from 'next/server';
import qs from 'querystring';

type ApiTokenResponse = {
  access_token: string;
};

type ProviderConfig = {
  url: string;
  params: Record<string, string>;
  responseMapper: (data: ApiTokenResponse) => { accessToken: string };
  cookieMaxAge: number;
};

export const exchangeCodeForToken = async (provider: OAuthProviders, code: string) => {
  const cookieLifetime = 60 * 15;

  const config: Record<OAuthProviders, ProviderConfig> = {
    google: {
      url: 'https://oauth2.googleapis.com/token',
      params: {
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: GOOGLE_REDIRECT_URI,
        access_type: 'offline',
        grant_type: 'authorization_code',
      },
      responseMapper: (data: ApiTokenResponse) => ({
        accessToken: data.access_token,
      }),
      cookieMaxAge: cookieLifetime,
    },
    vk: {
      url: 'https://oauth.vk.com/access_token',
      params: {
        code,
        client_id: VK_CLIENT_ID,
        client_secret: VK_CLIENT_SECRET,
        redirect_uri: VK_REDIRECT_URI,
      },
      responseMapper: (data: ApiTokenResponse) => ({
        accessToken: data.access_token,
      }),
      cookieMaxAge: cookieLifetime,
    },
  };

  const { url, params, responseMapper, cookieMaxAge } = config[provider];
  const tokenResponse = await axios.post(url, qs.stringify(params));

  const { accessToken } = responseMapper(tokenResponse.data);
  const response = NextResponse.json({ accessToken, provider });

  response.cookies.set('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: cookieMaxAge,
    path: '/',
  });

  response.cookies.set('provider', provider, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: cookieMaxAge,
    path: '/',
  });

  return response;
};
