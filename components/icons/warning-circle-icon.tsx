import * as React from 'react';

const WarningCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
        {...props}
    >
        <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M12 16.99V17m0-10v7m9-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0"
        ></path>
    </svg>
);

export default WarningCircleIcon;
