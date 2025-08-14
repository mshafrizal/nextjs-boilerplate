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
import { useRouter } from '@/i18n/navigation';

export default function PaymentExpiredDialog() {
    const t = useTranslations('BookingDetail');
    const router = useRouter();
    const { isModalPaymentExpiredOpen, toggleModalPaymentExpiredOpen } =
        useModalStore();

    function onGoToMyBooking() {
        toggleModalPaymentExpiredOpen();
        router.push('/my-booking?tab=upcoming');
    }

    return (
        <Dialog
            open={isModalPaymentExpiredOpen}
            onOpenChange={toggleModalPaymentExpiredOpen}
        >
            <DialogContent showCloseButton={false}>
                <VisuallyHidden>
                    <DialogTitle>{t('paymentExpired')}</DialogTitle>
                    <DialogDescription>
                        {t('paymentExpiredDesc')}
                    </DialogDescription>
                </VisuallyHidden>
                <div className="container mx-auto sm:max-w-[512px]!">
                    <Image
                        src={Failed}
                        alt={'Failed'}
                        width={120}
                        height={120}
                        className="mx-auto aspect-square mb-6"
                    />
                    <h2 className="h2 mb-2 text-center">
                        {t('paymentExpired')}
                    </h2>
                    <p className="text-neutral-500 mb-10 text-center">
                        {t('paymentExpiredDesc')}
                    </p>
                    <Button
                        className="h-12 text-base w-full mb-4"
                        onClick={onGoToMyBooking}
                    >
                        {t('backToMyBooking')}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
