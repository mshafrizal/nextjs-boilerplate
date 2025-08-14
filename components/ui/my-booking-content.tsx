'use client';

import MyBookingItem from '@/components/ui/my-booking-item';
import useBookingHistory from '@/hooks/useBookingHistory';
import { Button } from '@/components/ui/button';
import { InfoIcon, Loader2 } from 'lucide-react';
import MyBookingEmpty from '@/components/ui/my-booking-empty';
import { useTranslations } from 'next-intl';

export interface MyBookingContentProps {
    token?: string;
}

interface MyBookingBaseProps extends MyBookingContentProps {
    isOnGoing: boolean;
    sectionId: string;
    testId: string;
}

export default function MyBookingContent({
    token,
    isOnGoing,
    sectionId,
    testId,
}: Readonly<MyBookingBaseProps>) {
    const t = useTranslations('MyBooking');
    const { bookings, loading, error, loadMore, hasMore } = useBookingHistory({
        isOnGoing,
        token,
        limit: 9,
    });

    if (!loading && (!bookings || bookings.length === 0))
        return <MyBookingEmpty />;

    return (
        <section
            id={sectionId}
            data-testid={testId}
            className="flex flex-col gap-4"
        >
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {bookings.map((booking) => (
                    <MyBookingItem
                        key={booking.id}
                        id={booking.id}
                        booking_number={booking.booking_number}
                        booking_status={booking.booking_status}
                        room_name={booking.room_name}
                        room_qty={booking.room_qty}
                        checkin_date={booking.checkin_date}
                        checkout_date={booking.checkout_date}
                        total_night={booking.total_night}
                        total_price={booking.total_price}
                        property_name={booking.property_name}
                        payment_method={booking.payment_method}
                        property_id={booking.property_id}
                        booking_date={booking.booking_date}
                    />
                ))}
            </div>
            {loading && (
                <Loader2 className="animate-spin mx-auto h-10 w-10 text-brand-01" />
            )}
            {error && (
                <div className="flex flex-col items-center gap-2 text-neutral-600 p-10">
                    <p className="inline-flex gap-2 text-neutral-600 border-1 border-brand-01 rounded-md p-2">
                        <InfoIcon className="text-brand-01" /> {t('error')}
                    </p>
                </div>
            )}
            {hasMore && (
                <Button
                    onClick={() => loadMore()}
                    className="w-fit mx-auto"
                    disabled={loading}
                >
                    {t('loadMore')}
                </Button>
            )}
        </section>
    );
}
