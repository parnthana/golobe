import * as React from 'react';
import type { SVGProps } from 'react';
const SvgPen = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.063}
      d="M16.81 6.06 4.054 18.848l-.773 1.87 1.871-.772L17.94 7.19l-1.13-1.13Zm2.553-2.552-.553.552 1.13 1.13.552-.553a.774.774 0 0 0 0-1.094l-.035-.035a.774.774 0 0 0-1.094 0Z"
    />
  </svg>
);
export default SvgPen;
