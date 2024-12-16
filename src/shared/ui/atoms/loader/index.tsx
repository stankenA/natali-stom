import React, { FC } from 'react';
import styles from './styles.module.scss';
import clsx from 'clsx';

type LoaderProps = {
  size?: 'sm' | 'md' | 'lg';
};

export const Loader: FC<LoaderProps> = ({ size = 'md' }) => {
  return <span className={clsx(styles.loader, styles[`loader_${size}`])}></span>;
};

export const LoaderContainer: FC = () => {
  return (
    <div className={styles.container}>
      <Loader />
    </div>
  );
};
