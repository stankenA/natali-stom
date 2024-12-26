'use client';

import { LoaderContainer, Typo } from '@/shared/ui/atoms';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { authApi } from '@/shared/api/requests';
import { useUnit } from 'effector-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { userModel } from '@/entities/user';

export const CallbackPage = () => {
  const [user, setUser] = useUnit([userModel.$user, userModel.setUser]);
  const [isFailed, setIsFailed] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const authorizeUser = async () => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (!code || !state) {
      setIsFailed(true);

      return;
    }

    try {
      const { accessToken, provider } = await authApi.exchangeAuthCodeForToken({ code, state });

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
