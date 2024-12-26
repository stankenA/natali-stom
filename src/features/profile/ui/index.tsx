'use client';

import React, { FC } from 'react';
import styles from './styles.module.scss';
import { useUnit } from 'effector-react';
import { Button } from '@/shared/ui/atoms';
import Image from 'next/image';
import { userModel } from '@/entities/user';

export const Profile: FC = () => {
  const [user, logout, logoutStatus] = useUnit([
    userModel.$user,
    userModel.logout,
    userModel.logoutStatus,
  ]);

  return (
    <div className={styles.profile}>
      {user ? (
        <>
          <Image
            width={50}
            height={50}
            src={user.avatar}
            alt="Изображение профиля"
            className={styles.profile__image}
          />
          <Button onClick={logout} isLoading={logoutStatus === 'pending'}>
            Выйти
          </Button>
        </>
      ) : (
        <div className={styles.profile__login}>
          <Button design="fill" className={styles.profile__button} href="/api/auth/google/redirect">
            Войти с Google
          </Button>
          <Button design="fill" className={styles.profile__button} href="/api/auth/vk/redirect">
            Войти с VK
          </Button>
        </div>
      )}
    </div>
  );
};
