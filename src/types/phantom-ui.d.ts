import * as React from 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'phantom-ui': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        loading?: boolean | 'true' | 'false';
        animation?: 'shimmer' | 'pulse' | 'breathe' | 'solid';
        count?: number | string;
        speed?: number | string;
        className?: string;
        children?: React.ReactNode;
      }, HTMLElement>;
    }
  }
}
