'use client';

import { BookingStatus } from '@/lib/booking';
import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

interface Props {
    booking_status: keyof typeof BookingStatus;
}

export default function BookingDetailPaymentSummaryStatus(
    props: Readonly<Props>
) {
    const t = useTranslations('BookingDetail');
    const color = useMemo(() => {
        switch (props.booking_status) {
            case 'PAID':
                return 'border-brand-02 bg-yellow-00 text-yellow-300';
            case 'CANCELLED':
            case 'FAILED':
                return 'border-danger-200 bg-danger-00 text-danger-200';
            default:
                return '';
        }
    }, [props.booking_status]);
    const label = useMemo(() => {
        switch (props.booking_status) {
            case 'PAID':
                return 'Purchase Successful';
            case 'CANCELLED':
                return 'Cancelled';
            case 'FAILED':
                return 'Payment Failed';
            default:
                return '';
        }
    }, [props.booking_status]);
    return (
        <div
            id="booking-detail-payment-summary-status"
            data-testid="booking-detail-payment-summary-status"
            className={cn(
                'border border-dashed px-4 py-2 flex flex-col gap-2 rounded-sm',
                color
            )}
        >
            <p className="font-medium">{label}</p>
            {props.booking_status === 'PAID' && (
                <p className="text-sm">
                    Please check-in on 22 Feb 2023 • 12.00
                </p>
            )}
            {props.booking_status !== 'PAID' && (
                <div>
                    <p className="text-sm">{t('cancellationDate')}</p>
                    <p className="font-medium">4 Mar 2023 • 09.34</p>
                </div>
            )}
            {props.booking_status !== 'PAID' && (
                <div>
                    <p className="text-sm">{t('cancellationFee')}</p>
                    {props.booking_status === 'CANCELLED' && (
                        <p className="font-medium">Rp230.400</p>
                    )}
                    {props.booking_status === 'FAILED' && (
                        <p className="font-medium">-</p>
                    )}
                </div>
            )}
            {props.booking_status !== 'PAID' && (
                <div>
                    <p className="text-sm">{t('cancellationReason')}</p>

                    {props.booking_status === 'CANCELLED' && (
                        <p className="font-medium">
                            Already booked another hotel
                        </p>
                    )}
                    {props.booking_status === 'FAILED' && (
                        <p className="font-medium">Payment Failed</p>
                    )}
                </div>
            )}
        </div>
    );
}
