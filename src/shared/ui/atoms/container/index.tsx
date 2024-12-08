import React, { FC, PropsWithChildren } from 'react';
import styles from './styles.module.scss';
import clsx from 'clsx';

type ContainerProps = PropsWithChildren & {
  className?: string;
};

export const Container: FC<ContainerProps> = ({ children, className }) => {
  return <div className={clsx(styles.container, className)}>{children}</div>;
};
