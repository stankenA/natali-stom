import { Icon, Typo } from '@/shared/ui/atoms';
import { PageWrapper } from '@/widgets/page-wrapper';
import React, { FC } from 'react';

export const HomePage: FC = () => {
  return (
    <PageWrapper>
      Home page <Icon id="arrow-down" />
      <Typo>text</Typo> w
    </PageWrapper>
  );
};
