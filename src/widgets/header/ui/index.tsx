'use client';

import React, { FC } from 'react';
import styles from './styles.module.scss';
import { Container, Typo } from '@/shared/ui/atoms';
import Link from 'next/link';
import { Profile } from '@/features/profile';

export const Header: FC = () => {
  return (
    <header className={styles.header}>
      <Container className={styles.header__content}>
        <Link className={styles.header__logo} href="/">
          <Typo design="text-md-bold">L</Typo>
        </Link>
        <Profile />
      </Container>
    </header>
  );
};
