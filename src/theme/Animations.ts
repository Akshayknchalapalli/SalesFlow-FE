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