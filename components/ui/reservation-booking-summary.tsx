'use client';

import ReservationBookingSummaryGallery from '@/components/ui/reservation-booking-summary-gallery';
import HotelIcon from '@/components/icons/hotel-icon';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export default function ReservationBookingSummary() {
    const searchParams = useSearchParams();
    const roomsParams = searchParams.get('rooms');
    const roomsCount = useMemo(
        () => (roomsParams ? `(${roomsParams}x) ` : ''),
        [roomsParams]
    );
    const t = useTranslations('Reservation');
    return (
        <section
            id="booking-summary"
            className="bg-white w-full rounded-sm shadow-sm flex flex-col gap-4 p-4"
        >
            <ReservationBookingSummaryGallery
                images={[
                    'https://placehold.co/400x225/png',
                    'https://placehold.co/400x225/png',
                    'https://placehold.co/400x225/png',
                ]}
            />
            <div className="flex flex-col">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                    <HotelIcon className="text-brand-01 bg-yellow-50" />
                    <p
                        id="booking-summary-hotel-name"
                        className="text-neutral-400 font-medium"
                    >
                        Padma Resort Ubud
                    </p>
                </div>
                <p
                    id="booking-summary-room-name"
                    className="text-neutral-600 font-semibold mb-2"
                >
                    {roomsCount}Deluxe Signature Twin Room
                </p>
                <p className="text-neutral-600 font-semibold">Inclusion:</p>
                <p className="text-neutral-500">
                    Daily breakfast, Internet access, and all applicable taxes.
                </p>
            </div>
            <hr className="border-neutral-200" />
            <div className="flex flex-col md:flex-row md:items-center md:justify-between lg:gap-2 w-full">
                <div className="border border-neutral-200 rounded-sm p-2 md:w-1/3 lg:w-full text-center">
                    <p className="text-neutral-500">{t('checkIn')}</p>
                    <p className="font-semibold text-neutral-600">
                        Fri, 16 May 2025
                    </p>
                    <p className="text-neutral-500">From 14:00</p>
                </div>
                <p className="text-center my-2 md:my-0 text-nowrap">
                    1 {t('nights')}
                </p>
                <div className="border border-neutral-200 rounded-sm p-2 md:w-1/3 lg:w-full text-center">
                    <p className="text-neutral-500">{t('checkOut')}</p>
                    <p className="font-semibold text-neutral-600">
                        Sat, 17 May 2025
                    </p>
                    <p className="text-neutral-500">Before 12:00</p>
                </div>
            </div>
            <hr className="border-neutral-200" />
            <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center">
                <p className="text-neutral-500">{t('rate')}</p>
                <p className="text-neutral-600 font-semibold text-left md:text-right">
                    Non - Refundable Rate
                </p>
            </div>
            <div className="flex flex-col md:flex-row gap-2 md:justify-between md:items-center">
                <p className="text-neutral-500">{t('guests')}</p>
                <p className="text-neutral-600 font-semibold text-left md:text-right">
                    2 Adult(s)
                </p>
            </div>
        </section>
    );
}
