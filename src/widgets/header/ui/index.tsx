import React, { FC } from 'react';
import styles from './styles.module.scss';
import { Button, Container, Typo } from '@/shared/ui/atoms';
import Link from 'next/link';

export const Header: FC = () => {
  return (
    <header className={styles.header}>
      <Container className={styles.header__content}>
        <Link className={styles.header__logo} href="/">
          <Typo design="text-md-bold">L</Typo>
        </Link>
        <Button design="fill" className={styles.header__button}>
          Войти
        </Button>
      </Container>
    </header>
  );
};
