'use client';

import { LoaderContainer, Typo } from '@/shared/ui/atoms';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { authApi } from '@/shared/api/requests';
import { useUnit } from 'effector-react';
import { useRouter } from 'next/navigation';
import { userModel } from '@/entities/user';

export const CallbackPage = () => {
  const [user, setUser] = useUnit([userModel.$user, userModel.setUser]);
  const router = useRouter();
  const [isFailed, setIsFailed] = useState(false);

  const authorizeUser = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');

    if (!code || !state) {
      setIsFailed(true);

      return;
    }

    try {
      const { accessToken, provider } = await authApi.authUser({ code, state });

      if (provider === 'vk' || provider === 'google') {
        const user = await authApi.getUserInfo({ accessToken, provider });
        setUser(user);
      }

      router.replace('/');
    } catch (error) {
      setIsFailed(true);
    }
  };

  useEffect(() => {
    if (user) {
      router.replace('/');

      return;
    }

    authorizeUser();
  }, [user]);

  return (
    <div className={styles.page}>
      {isFailed ? <Typo>Что-то пошло не так</Typo> : <LoaderContainer />}
    </div>
  );
};
