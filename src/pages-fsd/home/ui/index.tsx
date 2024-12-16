'use client';

import { userModel } from '@/entities/user';
import { Container, Typo } from '@/shared/ui/atoms';
import { PageWrapper } from '@/widgets/page-wrapper';
import { useUnit } from 'effector-react';
import React, { FC } from 'react';

export const HomePage: FC = () => {
  const user = useUnit(userModel.$user);

  return (
    <PageWrapper>
      <Container>
        {user ? <Typo>Привет {user.name}!</Typo> : <Typo>Вы не авторизованы</Typo>}
      </Container>
    </PageWrapper>
  );
};
