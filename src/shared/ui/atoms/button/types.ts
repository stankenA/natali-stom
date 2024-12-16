import { AnchorHTMLAttributes, ButtonHTMLAttributes, PropsWithChildren } from 'react';

export type ButtonProps = PropsWithChildren<
  {
    design?: 'fill' | 'empty';
    disabled?: boolean;
    isLoading?: boolean;
  } & (
    | ButtonHTMLAttributes<HTMLButtonElement>
    | ({ href: string } & AnchorHTMLAttributes<HTMLAnchorElement>)
  )
>;
