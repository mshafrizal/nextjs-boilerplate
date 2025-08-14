'use client';

import { useTranslations } from 'next-intl';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import Failed from '@/app/failed_1.png';
import Image from 'next/image';
import { Button } from './button';
import { useModalStore } from '@/store/modal';

export default function RescheduleRoomUnavailableDialog() {
    const t = useTranslations('BookingDetail');
    const {
        isModalRescheduleRoomUnavailableOpen,
        toggleModalRescheduleRoomUnavailableOpen,
    } = useModalStore();

    function onGoToRoomList() {
        toggleModalRescheduleRoomUnavailableOpen();
    }

    return (
        <Dialog
            open={isModalRescheduleRoomUnavailableOpen}
            onOpenChange={toggleModalRescheduleRoomUnavailableOpen}
        >
            <DialogContent showCloseButton={false}>
                <VisuallyHidden>
                    <DialogTitle>{t('hotelResortNotFound')}</DialogTitle>
                    <DialogDescription>
                        {t('hotelResortNotFoundDesc')}
                    </DialogDescription>
                </VisuallyHidden>
                <div className="container mx-auto sm:max-w-[512px]! lg:my-10">
                    <Image
                        src={Failed}
                        alt={'Failed'}
                        width={120}
                        height={120}
                        className="mx-auto aspect-square mb-6"
                    />
                    <h2 className="h2 mb-2 text-center">
                        {t('hotelResortNotFound')}
                    </h2>
                    <p className="text-neutral-500 mb-10 text-center">
                        {t('hotelResortNotFoundDesc')}
                    </p>
                    <Button
                        className="h-12 text-base w-full mb-4"
                        onClick={onGoToRoomList}
                    >
                        {t('backToReschedule')}
                    </Button>
                    <Button
                        className="h-12 text-base w-full"
                        onClick={onGoToRoomList}
                        variant="outline"
                    >
                        {t('close')}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
