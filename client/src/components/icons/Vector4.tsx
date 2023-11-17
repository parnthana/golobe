import * as React from 'react';
import type { SVGProps } from 'react';
const SvgVector4 = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 38 27"
    {...props}
  >
    <path
      stroke="#121"
      strokeWidth={0.5}
      d="m37 26.5-18-10m-18 10 18-10m0 0V.5"
      opacity={0.25}
    />
  </svg>
);
export default SvgVector4;
