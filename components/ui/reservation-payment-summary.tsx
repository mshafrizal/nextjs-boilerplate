'use client';

import { useTranslations } from 'next-intl';
import CurrencyDisplay from '@/components/ui/currency-display';
import { Checkbox } from '@/components/ui/checkbox';
import React, { FormEvent, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { CheckedState } from '@radix-ui/react-checkbox';
import { useModalStore } from '@/store/modal';

interface ReservationPaymentSummaryProps {
    isAuthenticated: boolean;
}

export default function ReservationPaymentSummary(
    props: Readonly<ReservationPaymentSummaryProps>
) {
    const t = useTranslations('Reservation');
    const [consent, setConsent] = useState<CheckedState>(false);
    const { toggleModalRoomUnavailable, toggleModalInputPin } = useModalStore();
    function onConfirmBook(e: FormEvent) {
        e.preventDefault();
        if (!consent) return false;
        if (props.isAuthenticated) {
            toggleModalInputPin();
        } else {
            toggleModalRoomUnavailable();
        }
    }

    return (
        <section
            id="payment-summary"
            data-testid="payment-summary"
            className="flex flex-col gap-4 p-4 bg-white shadow-sm rounded-sm"
        >
            <p className="text-neutral-600 font-semibold text-[18px]">
                {t('paymentDetail')}
            </p>
            <div className="flex flex-col gap-2">
                <p className="text-neutral-500 font-semibold ">
                    {t('paymentTotal')}
                </p>
                <div className="flex justify-between items-start">
                    <p className="text-neutral-400 font-medium">
                        {t('stayTotal')}
                    </p>
                    <CurrencyDisplay
                        price={1083334}
                        className="text-neutral-600 font-semibold text-base"
                    />
                </div>
                <p className="text-neutral-400 font-medium">{t('extras')}</p>
                <div className="flex justify-between items-start">
                    <p className="text-neutral-400 font-medium">
                        (1x) Extra Bed:
                    </p>
                    <CurrencyDisplay
                        price={150000}
                        className="text-neutral-600 font-semibold text-base"
                    />
                </div>
                <div className="flex justify-between items-start">
                    <p className="text-neutral-400 font-medium">{t('taxes')}</p>
                    <CurrencyDisplay
                        price={216666}
                        className="text-neutral-600 font-semibold text-base"
                    />
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-neutral-500 font-semibold ">
                    {t('bookingTotal')}
                </p>
                <div className="flex justify-between items-start">
                    <p className="text-neutral-400 font-medium text-[18px]">
                        {t('stayTotal')}
                    </p>
                    <CurrencyDisplay
                        price={216666}
                        className="text-neutral-600 font-semibold text-[18px]"
                    />
                </div>
            </div>
            <form onSubmit={onConfirmBook} className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <Checkbox
                        id="booking-consent"
                        data-testid="booking-consent-checkbox"
                        required
                        name="booking-consent"
                        className="w-[18px] h-[18px]"
                        checked={consent}
                        onCheckedChange={setConsent}
                    />
                    <Label
                        htmlFor="booking-consent"
                        className={
                            'inline font-normal text-neutral-500 text-base'
                        }
                    >
                        {t.rich('bookingAgreement', {
                            terms: (chunks) => (
                                <Link
                                    href="/booking-terms"
                                    target="_blank"
                                    className="text-brand-01 font-medium underline"
                                >
                                    {chunks}
                                </Link>
                            ),
                            privacy: (chunks) => (
                                <Link
                                    href="/privacy-policy"
                                    target="_blank"
                                    className="text-brand-01 font-medium underline"
                                >
                                    {chunks}
                                </Link>
                            ),
                        })}
                    </Label>
                </div>
                <Button className="h-11 text-base" type={'submit'}>
                    {t('confirmBook')}
                </Button>
            </form>
        </section>
    );
}
