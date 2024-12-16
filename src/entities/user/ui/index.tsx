'use client';

import { useUnit } from 'effector-react';
import { FC, useEffect } from 'react';
import { model } from '../model';
import { ApiUser } from '@/shared/lib/types';

type UserProps = {
  user?: ApiUser;
};

export const User: FC<UserProps> = ({ user }) => {
  const setUser = useUnit(model.setUser);

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, []);

  return null;
};
