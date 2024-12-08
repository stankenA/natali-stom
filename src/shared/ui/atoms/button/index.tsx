import { ForwardedRef, forwardRef } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import styles from './styles.module.scss';
import { ButtonProps } from './types';

export const Button = forwardRef<HTMLAnchorElement | HTMLButtonElement, ButtonProps>(
  ({ children, disabled, className, design = 'empty', ...props }, ref) => {
    const classNames = clsx(styles.button, styles[`button_${design}`], className);

    if ('href' in props) {
      return (
        <Link
          {...props}
          ref={ref as ForwardedRef<HTMLAnchorElement>}
          className={classNames}
          href={props.href}
        >
          {children}
        </Link>
      );
    }

    return (
      <button
        disabled={disabled}
        {...props}
        ref={ref as ForwardedRef<HTMLButtonElement>}
        className={classNames}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';