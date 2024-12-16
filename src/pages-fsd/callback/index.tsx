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

  useEffect(() => {
    if (user) {
      router.replace('/');

      return;
    }

    const fetchUserData = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      if (!code) {
        setIsFailed(true);

        return;
      }

      try {
        const { accessToken } = await authApi.authWithGoogle({ code });
        const user = await authApi.getGoogleUser({ authToken: accessToken });
        setUser(user);
        router.replace('/');
      } catch (error) {
        setIsFailed(true);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className={styles.page}>
      {isFailed ? <Typo>Что-то пошло не так</Typo> : <LoaderContainer />}
    </div>
  );
};