import * as React from 'react';
import type { SVGProps } from 'react';
const SvgTrash = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="#000"
      d="M21 2.25H3a1.5 1.5 0 0 0-1.5 1.5v.75A1.5 1.5 0 0 0 3 6h18a1.5 1.5 0 0 0 1.5-1.5v-.75a1.5 1.5 0 0 0-1.5-1.5ZM3.49 7.5a.375.375 0 0 0-.375.414L4.35 19.753v.01a2.25 2.25 0 0 0 2.235 1.987h10.832a2.25 2.25 0 0 0 2.235-1.987v-.01l1.231-11.84a.374.374 0 0 0-.375-.413H3.49Zm11.666 8.47a.752.752 0 0 1-.239 1.232.749.749 0 0 1-.822-.172L12 14.936 9.906 17.03a.75.75 0 0 1-1.061-1.06l2.095-2.095-2.095-2.095a.75.75 0 0 1 1.06-1.06l2.096 2.094 2.094-2.094a.75.75 0 0 1 1.06 1.06l-2.094 2.095 2.095 2.095Z"
    />
  </svg>
);
export default SvgTrash;
