import { HTMLAttributes, memo } from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';
import { IconId } from './svg-sprite';

interface IconProps extends HTMLAttributes<HTMLOrSVGElement> {
  id?: IconId;
  className?: string;
}

export const Icon = memo(({ id, className, ...props }: IconProps) => {
  if (!id) {
    return null;
  }

  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      className={clsx(className, styles.svg)}
      {...props}
    >
      <use xlinkHref={`#${id}`} />
    </svg>
  );
});

Icon.displayName = 'Icon';
