// animations.ts
import { keyframes } from '@emotion/react';

export const accordionDown = keyframes`
  from { height: 0; }
  to { height: var(--radix-accordion-content-height); }
`;

export const accordionUp = keyframes`
  from { height: var(--radix-accordion-content-height); }
  to { height: 0; }
`;

export const sidebarFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-24px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const cardFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const navItemHover = keyframes`
  from {
    background: transparent;
  }
  to {
    background: rgba(37, 99, 235, 0.08);
  }
`;