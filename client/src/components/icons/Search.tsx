import * as React from 'react';
import type { SVGProps } from 'react';
const SvgSearch = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="#A9A9A9"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M10.364 3a7.364 7.364 0 1 0 0 14.727 7.364 7.364 0 0 0 0-14.727Z"
    />
    <path
      stroke="#A9A9A9"
      strokeLinecap="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M15.857 15.857 21 21"
    />
  </svg>
);
export default SvgSearch;
