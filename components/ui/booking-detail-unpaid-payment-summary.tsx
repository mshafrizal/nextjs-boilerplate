'use client';

import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import Image from 'next/image';
import bca from '@/app/bca.png';
import mastercard from '@/app/mastercard.png';
import jcb from '@/app/jcb.png';
import visa from '@/app/visa.png';
import amex from '@/app/amex.png';
import BookingDetailDetailModal from './booking-detail-detail-dialog';
import { Button } from './button';
import BookingDetailSwitchPayment from './booking-detail-switch-payment';

export default function BookingDetailUnpaidPaymentSummary() {
    const params = useSearchParams();
    const paymentMethodParams = params.get('paymentMethod');
    const t = useTranslations('BookingDetail');

    function onCopyBookingID() {
        if (typeof window !== 'undefined' && navigator) {
            navigator.clipboard
                .writeText('BK089327TR')
                .then(() => toast('Booking ID copied'))
                .catch((e: Error) => toast(e.message));
        }
    }

    function onPayNowClick() {
        alert('Payment integration on development');
    }

    return (
        <section
            id="booking-detail-unpaid-payment-summary"
            data-testid="booking-detail-unpaid-payment-summary"
            className="shadow-sm rounded-sm p-4 flex flex-col bg-white w-full"
        >
            <h2 className="text-lg text-neutral-600 font-semibold mb-3">
                {t('orderSummary')}
            </h2>

            <div className="py-1">
                <p className="mb-1 text-neutral-400 text-sm">
                    {t('guestInformation')}
                </p>
                <p className="text-neutral-600 font-medium">John Doe</p>
            </div>

            <hr className="border border-neutral-200 my-3" />

            <div className="py-1">
                <p className="mb-1 text-neutral-400 text-sm">
                    {t('bookingID')}
                </p>
                <div className="flex justify-between">
                    <p className="text-neutral-600 font-medium">BK089327TR</p>
                    <button
                        className="p-0 text-brand-01 font-semibold cursor-pointer"
                        onClick={onCopyBookingID}
                    >
                        Copy
                    </button>
                </div>
            </div>

            <hr className="border border-neutral-200 my-3" />

            {paymentMethodParams === 'va' && (
                <div className="py-1">
                    <div className="mb-1 flex gap-3 text-neutral-400 items-center">
                        <Image
                            src={bca}
                            width={34}
                            height={24}
                            alt="BCA icon"
                        />
                        <p className="font-medium text-xs">
                            BCA Virtual Account
                        </p>
                    </div>
                    <p className="text-neutral-400 text-sm mb-1">
                        {t('accountNumber')}
                    </p>
                    <div className="flex justify-between">
                        <p className="text-neutral-600 font-medium">
                            123 0887 4378 9990
                        </p>
                        <button
                            className="p-0 text-brand-01 font-semibold cursor-pointer"
                            onClick={onCopyBookingID}
                        >
                            Copy
                        </button>
                    </div>
                </div>
            )}

            {paymentMethodParams === 'card' && (
                <div className="py-1 flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <Image
                            src={mastercard}
                            alt={'Mastercard'}
                            height={24}
                            width={24}
                        />
                        <Image src={visa} alt={'Visa'} height={8} width={29} />
                        <Image src={jcb} alt={'JCB'} height={20} width={24} />
                        <Image src={amex} alt={'Amex'} height={24} width={29} />
                    </div>
                    <p className="text-neutral-400 text-xs font-medium">
                        Credit/Debit Card
                    </p>
                </div>
            )}

            <hr className="border border-neutral-200 my-3" />

            <div className="pt-1 pb-2 border-b border-neutral-200">
                <p className="text-sm text-neutral-600 font-semibold">
                    {t('priceDetails')}
                </p>
                <div className="flex justify-between py-[10px]">
                    <p className="text-neutral-400 text-sm">
                        (1x) Mountain Gateway
                    </p>
                    <p className="text-neutral-500 font-medium">Rp1,400,000</p>
                </div>
                <div className="flex justify-between py-[10px]">
                    <p className="text-neutral-400 text-sm">(1x) Extra Bed</p>
                    <p className="text-neutral-500 font-medium">Rp150,000</p>
                </div>
            </div>

            <div className="flex justify-between py-4 border-b border-neutral-200 mb-6">
                <p className="text-neutral-500 text-lg font-medium">
                    {t('totalToPay')}
                </p>
                <p className="text-neutral-600 text-lg font-semibold">
                    Rp1,550,000
                </p>
            </div>
            {paymentMethodParams === 'card' && (
                <Button className="h-12 mb-3" onClick={onPayNowClick}>
                    {t('payNow')}
                </Button>
            )}
            <BookingDetailDetailModal />
            <BookingDetailSwitchPayment />
        </section>
    );
}
