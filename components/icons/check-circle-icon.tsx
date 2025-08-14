import * as React from 'react';

const CheckCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        fill="none"
        viewBox="0 0 14 14"
        {...props}
    >
        <path
            fill="currentColor"
            fillRule="evenodd"
            d="M7 13.4A6.4 6.4 0 1 0 7 .6a6.4 6.4 0 0 0 0 12.8m2.965-7.434a.8.8 0 0 0-1.131-1.132L6.2 7.47 5.165 6.434a.8.8 0 1 0-1.131 1.132l1.6 1.6a.8.8 0 0 0 1.131 0z"
            clipRule="evenodd"
        ></path>
    </svg>
);

export default CheckCircleIcon;
