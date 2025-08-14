'use client';

import { Button } from '@/components/ui/button';
import NotificationIcon from '@/components/icons/notification-icon';

export default function NotificationButton() {
    return (
        <Button
            className={`relative h-11 w-11 flex items-center justify-center text-neutral-600`}
            variant="ghost"
        >
            <NotificationIcon className="size-6" />
            <span className="absolute top-0 right-0 rounded-full px-1 text-xs text-right bg-danger-200 text-white">
                2
            </span>
        </Button>
    );
}
