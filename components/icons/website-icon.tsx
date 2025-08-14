import * as React from 'react';

const WebsiteIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
        {...props}
    >
        <circle
            cx="12"
            cy="12"
            r="9"
            stroke="currentColor"
            strokeWidth="2"
        ></circle>
        <path fill="currentColor" d="M4 8h16v1.6H4zM4 15h16v1.6H4z"></path>
        <path
            stroke="currentColor"
            strokeWidth="1.6"
            d="M12 3s-3 3.5-3 9 3 9 3 9M12.5 3s3 3.5 3 9-3.5 9-3.5 9"
        ></path>
    </svg>
);

export default WebsiteIcon;
