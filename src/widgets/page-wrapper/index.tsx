import React, { FC, PropsWithChildren } from 'react';
import { Header } from '@/widgets/header';
import { Footer } from '@/widgets/footer';
import styles from './styles.module.scss';

export const PageWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  );
};
