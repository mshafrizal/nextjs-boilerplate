import * as React from 'react';

const RoomIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
        {...props}
    >
        <path
            fill="currentColor"
            d="M13.4 2.4a1 1 0 0 1 1 1V4h3.1a1.3 1.3 0 0 1 1.3 1.3v14.3h1.6l.082.003a.8.8 0 0 1 0 1.592l-.082.005h-2.2a1 1 0 0 1-1-1V5.6h-2.8v15a1 1 0 0 1-1 1h-10a1 1 0 0 1-1-1v-.4a1 1 0 0 1 1-1h1.4V3.4a1 1 0 0 1 1-1zM6.8 19.6h5.6V4.4H6.8z"
        ></path>
        <circle cx="8.5" cy="9.5" r="0.5" fill="currentColor"></circle>
    </svg>
);

export default RoomIcon;
