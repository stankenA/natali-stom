import React, { FC, PropsWithChildren } from 'react';
import { Header } from '@/widgets/header';
import { Footer } from '@/widgets/footer';

export const PageWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};
