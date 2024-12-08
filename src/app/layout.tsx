import type { Metadata } from 'next';
import { baseMetadata } from '@/shared/lib/metadata';
import { SvgSprite } from '@/shared/ui/atoms';
import { Poppins } from 'next/font/google';
import '@/shared/styles/index.scss';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  ...baseMetadata,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={poppins.className}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <div id="portal"></div>
        <SvgSprite />
      </body>
    </html>
  );
}
