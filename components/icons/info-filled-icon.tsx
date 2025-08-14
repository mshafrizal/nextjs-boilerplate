import * as React from 'react';

const InfoFilledIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="none"
        viewBox="0 0 16 16"
        {...props}
    >
        <g fill="currentColor" clipPath="url(#clip0_3_3335)">
            <path
                d="M8 14.667A6.667 6.667 0 1 0 8 1.333a6.667 6.667 0 0 0 0 13.334"
                opacity="0.3"
            ></path>
            <path d="M8.666 7.333a.667.667 0 0 0-1.333 0v3.334a.667.667 0 1 0 1.333 0zM8.666 5.333a.667.667 0 1 0-1.333 0 .667.667 0 0 0 1.333 0"></path>
        </g>
        <defs>
            <clipPath id="clip0_3_3335">
                <path fill="#fff" d="M0 0h16v16H0z"></path>
            </clipPath>
        </defs>
    </svg>
);

export default InfoFilledIcon;
