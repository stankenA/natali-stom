export const IS_SSR = typeof window === 'undefined';
export const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

export const VK_CLIENT_ID = process.env.VK_CLIENT_ID || '';
export const VK_CLIENT_SECRET = process.env.VK_CLIENT_SECRET || '';
export const VK_REDIRECT_URI = process.env.VK_REDIRECT_URI || '';
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';
export const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || '';
