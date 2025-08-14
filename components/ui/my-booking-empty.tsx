'use client';

import Booking from '@/app/booking.png';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
export default function MyBookingEmpty() {
    const t = useTranslations('MyBooking');
    return (
        <div
            data-testid="empty-booking"
            className="w-full max-w-[290px] mx-auto py-6 text-center"
        >
            <Image
                src={Booking}
                width={120}
                height={120}
                className="aspect-square w-[120px] mb-8 mx-auto"
                alt="booking empty illustration"
            />
            <h2 className="text-neutral-600 font-semibold text-lg mb-4">
                {t('emptyBookingTitle')}
            </h2>
            <p className="text-neutral-400 mb-8">{t('emptyBookingDesc')}</p>
            <Link
                href="/"
                className="w-full h-10 bg-brand-01 text-white text-sm font-semibold flex items-center justify-center text-center rounded-lg"
            >
                {t('emptyBookingAction')}
            </Link>
        </div>
    );
}
