import * as React from 'react';

const SvgIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
        {...props}
    >
        <path
            fill="none"
            d="M16.685 8a1 1 0 0 1 1 1v5.4h3.736a1 1 0 0 1 1 1v7h.78a.8.8 0 0 1 0 1.6H9.8a.8.8 0 0 1 0-1.6h.78V9a1 1 0 0 1 1-1z"
        ></path>
        <rect
            width="19"
            height="2"
            x="3"
            y="20"
            fill="currentColor"
            rx="1"
        ></rect>
        <mask id="path-3-inside-1_201_30413" fill="#fff">
            <path d="M5 3a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v19H5z"></path>
        </mask>
        <path
            stroke="currentColor"
            strokeWidth="4"
            d="M5 3a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v19H5z"
            mask="url(#path-3-inside-1_201_30413)"
        ></path>
        <mask id="path-4-inside-2_201_30413" fill="#fff">
            <path d="M12 10h7a1 1 0 0 1 1 1v11h-8z"></path>
        </mask>
        <path
            stroke="currentColor"
            strokeWidth="3.2"
            d="M12 10h7a1 1 0 0 1 1 1v11h-8z"
            mask="url(#path-4-inside-2_201_30413)"
        ></path>
        <rect
            width="3"
            height="2"
            x="8"
            y="7"
            fill="currentColor"
            rx="0.3"
        ></rect>
        <rect
            width="3"
            height="2"
            x="8"
            y="11"
            fill="currentColor"
            rx="0.3"
        ></rect>
        <rect
            width="2"
            height="2"
            x="15"
            y="13"
            fill="currentColor"
            rx="0.3"
        ></rect>
        <rect
            width="2"
            height="2"
            x="15"
            y="16"
            fill="currentColor"
            rx="0.3"
        ></rect>
        <rect
            width="3"
            height="2"
            x="8"
            y="15"
            fill="currentColor"
            rx="0.3"
        ></rect>
    </svg>
);

export default SvgIcon;
