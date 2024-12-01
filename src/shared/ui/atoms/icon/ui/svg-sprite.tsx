import { FC } from 'react';

export type IconId = 'arrow-down';

export const SvgSprite: FC = () => (
  <svg
    style={{
      position: 'absolute',
      width: 1,
      height: 1,
      margin: -1,
      padding: 0,
      overflow: 'hidden',
      border: 0,
      clip: 'rect(0 0 0 0)',
      appearance: 'none',
    }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <symbol id="arrow-down" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M18.364 9.36396L12 15.7279L5.63604 9.36396" stroke="currentColor" strokeWidth="2" />
    </symbol>
  </svg>
);
