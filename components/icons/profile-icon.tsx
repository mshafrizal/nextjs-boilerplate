import * as React from 'react';

const ProfileIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
        {...props}
    >
        <g id="Iconly/Bulk/Profile">
            <g id="Profile" fill="#101828">
                <path
                    id="Fill 1"
                    d="M11.997 15.175c-4.313 0-7.997.68-7.997 3.4S7.66 22 11.997 22c4.313 0 7.997-.68 7.997-3.4 0-2.721-3.66-3.425-7.997-3.425"
                ></path>
                <path
                    id="Fill 4"
                    d="M11.997 12.584a5.273 5.273 0 0 0 5.292-5.292A5.273 5.273 0 0 0 11.997 2a5.274 5.274 0 0 0-5.292 5.292 5.274 5.274 0 0 0 5.292 5.292"
                    opacity="0.4"
                ></path>
            </g>
        </g>
    </svg>
);

export default ProfileIcon;
