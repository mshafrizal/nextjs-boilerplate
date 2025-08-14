import * as React from 'react';

const UserCTAIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="none"
        viewBox="0 0 32 32"
        {...props}
    >
        <rect width="28" height="28" x="2" y="2" fill="#EBD5B2" rx="14"></rect>
        <rect
            width="28"
            height="28"
            x="2"
            y="2"
            stroke="#FFF6E5"
            strokeWidth="4"
            rx="14"
        ></rect>
        <path
            stroke="#271717"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.667 22h-7.334c-.92 0-1.666-.746-1.666-1.667 0-2.72 4-2.666 5.333-2.666s5.333-.054 5.333 2.666c0 .92-.746 1.667-1.666 1.667M16 15.333A2.667 2.667 0 1 0 16 10a2.667 2.667 0 0 0 0 5.333"
        ></path>
    </svg>
);

export default UserCTAIcon;
