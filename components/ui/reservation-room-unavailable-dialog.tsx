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
import { useParams, useSearchParams } from 'next/navigation';
import { useRouter } from '@/i18n/navigation';
export default function ReservationRoomUnavailableDialog() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const params = useParams() as { id: string };
    const t = useTranslations('Reservation');
    const { isModalRoomUnavailableOpen, toggleModalRoomUnavailable } =
        useModalStore();

    function onGoToRoomList() {
        toggleModalRoomUnavailable();
        router.push(`/search/${params.id}` + '?' + searchParams.toString());
    }

    return (
        <Dialog
            open={isModalRoomUnavailableOpen}
            onOpenChange={toggleModalRoomUnavailable}
        >
            <DialogContent showCloseButton={false}>
                <VisuallyHidden>
                    <DialogTitle>{t('roomNoLongerAvailable')}</DialogTitle>
                    <DialogDescription>
                        {t('roomNoLongerAvailableDesc')}
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
                        {t('roomNoLongerAvailable')}
                    </h2>
                    <p className="text-neutral-500 mb-10 text-center">
                        {t('roomNoLongerAvailableDesc')}
                    </p>
                    <Button
                        className="h-11 text-base w-full"
                        onClick={onGoToRoomList}
                    >
                        {t('goToRoomList')}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
