'use client';

import NotificationBulkIcon from '@/components/icons/notification-bulk-icon';
import { XIcon } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from './dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import AppStore from '@/app/appstore.png';
import PlayStore from '@/app/playstore.png';
import Image from 'next/image';
import { Button } from './button';
import { DialogClose } from '@radix-ui/react-dialog';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
export default function HomeFloatingBanner() {
    const t = useTranslations('Home');
    const [open, setOpen] = useState(true);
    return (
        <div
            className={`sticky z-50 bottom-10 w-full flex flex-col items-end justify-end gap-2 px-6 ${!open ? 'hidden' : ''}`}
        >
            <div className="relative bg-white text-neutral-600 px-2 py-2 md:px-2 md:py-3 lg:px-5 lg:py-6 rounded-lg inline-flex items-center gap-1 md:gap-2 shadow-xl">
                <NotificationBulkIcon className="text-brand-01 size-4 sm:size-6" />
                <p className="text-xs md:text-sm">{t('betterRateAwait')}</p>
                <Dialog>
                    <DialogTrigger asChild>
                        <button className="text-xs md:text-sm cursor-pointer text-brand-01 font-semibold">
                            {t('viewMore')}
                        </button>
                    </DialogTrigger>
                    <DialogContent
                        showCloseButton={false}
                        className="flex flex-col gap-4 md:p-10"
                    >
                        <VisuallyHidden>
                            <DialogTitle>
                                {t('floatingBannerTitle')}
                            </DialogTitle>
                            <DialogDescription>
                                {t('floatingBannerDesc')}
                            </DialogDescription>
                        </VisuallyHidden>
                        <h2 className="h2 mx-auto max-w-[512px] ">
                            {t('floatingBannerTitle')}
                        </h2>
                        <p className="mx-auto max-w-[512px] text-center">
                            {t('floatingBannerDesc')}
                        </p>
                        <div className="flex gap-4 mx-auto max-w-[512px]  text-center">
                            <Image
                                src={AppStore}
                                width={129}
                                height={40}
                                alt="App store"
                                className="w-[129px] h-10"
                            />
                            <Image
                                src={PlayStore}
                                width={135}
                                height={40}
                                alt="Play store"
                                className="w-[135px] h-10"
                            />
                        </div>
                        <DialogClose asChild>
                            <Button
                                variant="outline"
                                className="mx-auto max-w-[512px] w-full border-yellow-200 text-yellow-200 hover:bg-yellow-00 cursor-pointer"
                            >
                                {t('close')}
                            </Button>
                        </DialogClose>
                    </DialogContent>
                </Dialog>
                <button
                    className="absolute top-[-10px] cursor-pointer -right-4 shadow-xl rounded-full bg-white h-7 w-7 flex items-center justify-center"
                    onClick={() => setOpen(false)}
                >
                    <XIcon className="text-neutral-800 size-4" />
                </button>
            </div>
        </div>
    );
}
