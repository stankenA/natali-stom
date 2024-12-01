import type { Metadata } from 'next';
import { baseMetadata } from '@/shared/lib/metadata';
import { SvgSprite } from '@/shared/ui/atoms';
import '@/shared/styles/index.scss';

export const metadata: Metadata = {
  ...baseMetadata,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        {children}
        <div id="portal"></div>
        <SvgSprite />
      </body>
    </html>
  );
}
