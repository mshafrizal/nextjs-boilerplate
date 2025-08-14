'use client';

import BookingDetailCancelReservation from './booking-detail-cancel-reservation';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import BookingDetailReschedule from '@/components/ui/booking-detail-reschedule';

export default function BookingDetailPreference() {
    const searchParams = useSearchParams();
    const bookingStatusParams = searchParams.get('status');
    const tabParam = searchParams.get('tab');
    const t = useTranslations('BookingDetail');
    return (
        <section
            id="booking-detail-preference"
            data-testid="booking-detail-preference"
            className="shadow-sm rounded-sm p-4 flex flex-col gap-4 bg-white"
        >
            <div className="pt-1 flex flex-col gap-3">
                <h2 className="text-lg text-neutral-600 font-semibold">
                    {t('preference')}
                </h2>
                <div>
                    <p className="text-neutral-400 text-sm">
                        {t('airportPickupDetails')}
                    </p>
                    <p className="text-neutral-600 font-medium">
                        {t('airportPickupDetailsContent')}
                    </p>
                </div>
                <div>
                    <p className="text-neutral-400 text-sm">
                        {t('isThisYourFirstTime')}
                    </p>
                    <p className="text-neutral-600 font-medium">
                        {t('isThisYourFirstTimeDesc')}
                    </p>
                </div>
            </div>

            <hr className="border border-neutral-200" />

            <div className="flex flex-col gap-3">
                <h2 className="text-lg text-neutral-600 font-semibold">
                    {t('cancellationAndModification')}
                </h2>
                <div className="flex flex-col gap-2">
                    <p className="text-neutral-500 text-sm">
                        {t('cancellationPolicy')}
                    </p>
                    <p className="text-neutral-500 text-sm">
                        {t('cancellationPolicy2')}
                    </p>
                </div>
            </div>
            <div className="py-2">
                <p className="text-neutral-500 text-sm">
                    {t('cancellationPolicy3')}
                </p>
            </div>

            {bookingStatusParams === 'PAID' && tabParam === 'upcoming' && (
                <BookingDetailReschedule
                    propertyName={'Padma Resort Legian'}
                    propertyId={'VolejRejNm'}
                />
            )}

            {bookingStatusParams === 'PAID' && (
                <BookingDetailCancelReservation />
            )}
        </section>
    );
}
