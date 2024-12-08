import clsx from 'clsx';
import styles from './styles.module.scss';
import { HTMLAttributes, HTMLAttributeAnchorTarget, forwardRef, createElement } from 'react';

export type TypoDesignToken = `title-${'h1'}` | `text-${'md' | 'md-bold'}`;

export type TypoTagNameType = keyof Omit<
  JSX.IntrinsicElements,
  Exclude<keyof SVGElementTagNameMap, 'a'>
>;

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  as?: TypoTagNameType;
  design?: TypoDesignToken;
  raw?: string | (string | JSX.Element)[];
  href?: string;
  htmlFor?: string;
  target?: HTMLAttributeAnchorTarget;
}

export const Typo = forwardRef<HTMLElement, TypographyProps>(
  ({ as: Tag = 'div', design = 'text-md', raw, className, children, ...rest }, ref) =>
    createElement(
      Tag,
      {
        ref,
        className: clsx(styles[design], className),
        ...rest,
        ...(raw ? { dangerouslySetInnerHTML: { __html: raw } } : {}),
      },
      !raw ? children : null,
    ),
);

Typo.displayName = 'Typo';
