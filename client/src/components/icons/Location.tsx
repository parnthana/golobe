import * as React from 'react';
import type { SVGProps } from 'react';
const SvgLocation = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path fill="#000" d="M12 10.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
    <path
      fill="#000"
      d="M12 1.5c-4.135 0-7.5 3.218-7.5 7.172 0 1.883.858 4.387 2.55 7.443 1.36 2.453 2.933 4.672 3.75 5.776a1.49 1.49 0 0 0 2.402 0c.816-1.104 2.39-3.323 3.75-5.776 1.69-3.055 2.548-5.56 2.548-7.443C19.5 4.718 16.135 1.5 12 1.5ZM12 12a3 3 0 1 1 0-5.999A3 3 0 0 1 12 12Z"
    />
  </svg>
);
export default SvgLocation;
