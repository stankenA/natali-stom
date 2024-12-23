import type { Metadata } from 'next';
import { baseMetadata } from '@/shared/lib/metadata';
import { SvgSprite } from '@/shared/ui/atoms';
import { Poppins } from 'next/font/google';
import { cookies } from 'next/headers';
import { authApi } from '@/shared/api/requests';
import { User } from '@/entities/user';
import '@/shared/styles/index.scss';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  ...baseMetadata,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookiesStore = cookies();
  const accessToken = cookiesStore.get('accessToken')?.value;
  const provider = cookiesStore.get('provider')?.value;
  let user;

  if (accessToken && (provider === 'vk' || provider === 'google')) {
    const userInfo = await authApi.getUserInfo({ accessToken, provider });
    user = userInfo;
  }

  return (
    <html lang="ru" className={poppins.className}>
      <body>
        {children}
        <div id="portal"></div>
        <SvgSprite />
        <User user={user} />
      </body>
    </html>
  );
}
