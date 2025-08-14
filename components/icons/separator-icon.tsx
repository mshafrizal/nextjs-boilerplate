import * as React from 'react';

const SvgIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="376"
        height="1"
        fill="none"
        viewBox="0 0 376 1"
        {...props}
    >
        <path stroke="currentColor" d="M0 .5h376"></path>
    </svg>
);

export default SvgIcon;
