'use client';

import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { useModalStore } from '@/store/modal';

export default function BookingDetailExpiredPaymentSummary() {
    const { toggleModalPaymentExpiredOpen } = useModalStore();
    const t = useTranslations('BookingDetail');
    function onPayNowClick() {
        toggleModalPaymentExpiredOpen();
    }
    return (
        <section
            id="booking-detail-paid-payment-summary"
            data-testid="booking-detail-paid-payment-summary"
            className="shadow-sm rounded-sm p-4 bg-white"
        >
            <h2 className="text-neutral-600 text-lg font-semibold mb-4">
                {t('orderSummary')}
            </h2>
            <div className="flex justify-between py-4">
                <p className="font-medium text-neutral-600">
                    {t('paymentMethod')}
                </p>
                <p className="text-neutral-500">Virtual Account</p>
            </div>
            <div className="py-2 border-b border-neutral-200">
                <div className="flex justify-between items-center py-2">
                    <p className="text-sm text-neutral-400">
                        (3x) Mountain Gateway
                    </p>
                    <p className="text-neutral-500 font-medium">Rp6.603.000</p>
                </div>
                <div className="flex justify-between">
                    <p className="text-sm text-neutral-400">(1x) Extra Bed</p>
                    <p className="text-neutral-500 font-medium">Rp179.000</p>
                </div>
            </div>
            <div className="flex justify-between py-4 mb-4 border-b border-neutral-200">
                <p className="text-neutral-500 font-medium">
                    {t('totalPayment')}
                </p>
                <p className="text-neutral-600 font-semibold text-lg">
                    Rp6.782.000
                </p>
            </div>
            <Button className="h-12 w-full" onClick={onPayNowClick}>
                {t('payNow')}
            </Button>
        </section>
    );
}
