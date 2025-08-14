'use client';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from './dropdown-menu';
import { MenuIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useModalStore } from '@/store/modal';
import { useRouter } from '@/i18n/navigation';
import { useState } from 'react';
import { useResponsive } from '@/hooks/useResponsive';

interface MenuDropdownProps {
    isAuthenticated: boolean;
}

export default function MenuDropdown({
    isAuthenticated,
}: Readonly<MenuDropdownProps>) {
    const t = useTranslations('PageLayout.links');
    const router = useRouter();
    const { toggleModalAboutUs, toggleModalPrivacy, toggleModalMyBooking } =
        useModalStore();
    const [open, setOpen] = useState(false);
    const { isMobile } = useResponsive();

    function onMyBookingClick() {
        if (isAuthenticated) router.push('/my-booking?tab=upcoming');
        else toggleModalMyBooking();
    }

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <button
                    className={`flex items-center justify-center p-2 cursor-pointer menu-dropdown ${open && 'bg-yellow-00 rounded-md'}`}
                >
                    <MenuIcon />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-72 sm:w-96 p-6" align="start">
                <DropdownMenuItem
                    className={'text-neutral-800 block mb-2 cursor-pointer'}
                    onClick={onMyBookingClick}
                >
                    <p className={'font-semibold'}>{t('myBooking')}</p>
                    <p className={'text-[#667085] text-sm'}>
                        {t('myBookingDesc')}
                    </p>
                </DropdownMenuItem>
                <DropdownMenuItem
                    className={'text-neutral-800 block cursor-pointer'}
                    onClick={() => toggleModalPrivacy()}
                >
                    <p className={'font-semibold'}>{t('privacyNotice')}</p>
                    <p className={'text-[#667085] text-sm'}>
                        {t('privacyNoticeDesc')}
                    </p>
                </DropdownMenuItem>
                {isMobile && (
                    <DropdownMenuItem
                        className={'text-neutral-800 block mb-2 cursor-pointer'}
                        onClick={() => toggleModalAboutUs()}
                    >
                        <p className={'font-semibold'}>{t('about')}</p>
                        <p className={'text-[#667085] text-sm'}>
                            {t('aboutDesc')}
                        </p>
                    </DropdownMenuItem>
                )}
                {isMobile && (
                    <DropdownMenuItem
                        className={'text-neutral-800 block cursor-pointer'}
                        onClick={() => toggleModalPrivacy()}
                    >
                        <p className={'font-semibold'}>{t('rooms')}</p>
                        <p className={'text-[#667085] text-sm'}>
                            {t('roomsDesc')}
                        </p>
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
