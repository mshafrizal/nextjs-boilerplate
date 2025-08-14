import * as React from 'react';

const DiamondIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="none"
        viewBox="0 0 32 32"
        {...props}
    >
        <g clipPath="url(#clip0_2094_1910)">
            <path
                fill="#94A3C2"
                d="M1 21.868a2 2 0 0 0 .971 1.715l13 7.8a2 2 0 0 0 2.058 0l13-7.8A2 2 0 0 0 31 21.868V10.132a2 2 0 0 0-.971-1.715l-13-7.8a2 2 0 0 0-2.058 0l-13 7.8A2 2 0 0 0 1 10.132z"
            ></path>
            <path
                fill="#fff"
                fillOpacity="0.2"
                d="M3.05 20.711a2 2 0 0 0 1.104 1.866l12.878 6.44a2 2 0 0 0 1.902-.062l10.074-5.876A2 2 0 0 0 30 21.35v-11.19a2 2 0 0 0-1.008-1.737L17.051 1.601a2 2 0 0 0-2.07.051L4.38 8.437a2 2 0 0 0-.921 1.607z"
            ></path>
            <path
                fill="#899CC0"
                d="M11.19 10h9.62c.106 0 .211.024.306.07a.7.7 0 0 1 .24.194l2.58 3.361a.31.31 0 0 1-.025.405l-7.663 7.867A.34.34 0 0 1 16 22a.35.35 0 0 1-.248-.103L8.09 14.031a.308.308 0 0 1-.025-.405l2.58-3.363a.7.7 0 0 1 .24-.193c.094-.046.2-.07.306-.07"
            ></path>
            <g filter="url(#filter0_f_2094_1910)">
                <path
                    fill="#E8E8E8"
                    d="m24.5 10 .29 3.21 3.21.29-3.21.29L24.5 17l-.29-3.21L21 13.5l3.21-.29z"
                ></path>
            </g>
            <g filter="url(#filter1_f_2094_1910)">
                <path
                    fill="#E8E8E8"
                    d="m8.167 20 .427 4.74 4.74.427-4.74.427-.427 4.74-.428-4.74L3 25.167l4.74-.428z"
                ></path>
            </g>
            <g filter="url(#filter2_f_2094_1910)">
                <path
                    fill="#E8E8E8"
                    d="m10.167 0 .427 4.74 4.74.427-4.74.427-.427 4.74-.428-4.74L5 5.167l4.74-.428z"
                ></path>
            </g>
        </g>
        <defs>
            <filter
                id="filter0_f_2094_1910"
                width="7.2"
                height="7.2"
                x="20.9"
                y="9.9"
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
            >
                <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                <feBlend
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                ></feBlend>
                <feGaussianBlur
                    result="effect1_foregroundBlur_2094_1910"
                    stdDeviation="0.05"
                ></feGaussianBlur>
            </filter>
            <filter
                id="filter1_f_2094_1910"
                width="10.533"
                height="10.533"
                x="2.9"
                y="19.9"
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
            >
                <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                <feBlend
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                ></feBlend>
                <feGaussianBlur
                    result="effect1_foregroundBlur_2094_1910"
                    stdDeviation="0.05"
                ></feGaussianBlur>
            </filter>
            <filter
                id="filter2_f_2094_1910"
                width="10.533"
                height="10.533"
                x="4.9"
                y="-0.1"
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
            >
                <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                <feBlend
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                ></feBlend>
                <feGaussianBlur
                    result="effect1_foregroundBlur_2094_1910"
                    stdDeviation="0.05"
                ></feGaussianBlur>
            </filter>
            <clipPath id="clip0_2094_1910">
                <path fill="#fff" d="M0 0h32v32H0z"></path>
            </clipPath>
        </defs>
    </svg>
);

export default DiamondIcon;
