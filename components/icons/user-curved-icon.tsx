import * as React from 'react';

const UserCurvedIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
            d="M17.5 21h-11A2.5 2.5 0 0 1 4 18.5c0-4.08 6-4 8-4s8-.08 8 4a2.5 2.5 0 0 1-2.5 2.5M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8"
        ></path>
    </svg>
);

export default UserCurvedIcon;
