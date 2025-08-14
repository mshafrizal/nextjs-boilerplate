'use server';

import { getTranslations } from 'next-intl/server';
import HotelIcon from '@/components/icons/hotel-icon';

export default async function BookingDetailRoom() {
    const t = await getTranslations('BookingDetail');
    return (
        <section
            id="booking-detail-room"
            data-testid="booking-detail-room"
            className="shadow-sm rounded-sm bg-white"
        >
            <div className="flex gap-3 px-4 py-3">
                <HotelIcon className="size-6 text-brand-01" />
                <h2 className="text-lg text-neutral-600 font-semibold">
                    Padma Resort Ubud
                </h2>
            </div>
            <div className="flex flex-col gap-3 px-4 py-2">
                <div className="flex justify-between">
                    <div className="flex flex-col gap-[2px]">
                        <p
                            className="text-neutral-500 text-sm font-medium"
                            data-testid="room-name"
                        >
                            Premier Deluxe Room - 59m<sup>2</sup>
                        </p>
                        <p
                            className="text-neutral-400 text-sm"
                            data-testid="room-capacity"
                        >
                            2 Guest(s) per room
                        </p>
                    </div>
                    <div className="flex flex-col gap-[2px]">
                        <p
                            className="text-neutral-500 font-medium"
                            data-testid="room-type"
                        >
                            (2x) Mountain Gateway
                        </p>
                        <p
                            className="text-neutral-500 font-medium"
                            data-testid="room-extra"
                        >
                            (1x) Extra Bed
                        </p>
                    </div>
                </div>
                <hr className="border border-neutral-200" />
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                        <p className="text-sm">{t('checkin')}</p>
                        <p
                            className="text-neutral-500 font-medium"
                            data-testid="room-extra"
                        >
                            Wed, 22 Feb 2023
                        </p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-sm">{t('checkout')}</p>
                        <p
                            className="text-neutral-500 font-medium"
                            data-testid="room-extra"
                        >
                            Thu, 23 Feb 2023
                        </p>
                    </div>
                </div>
            </div>
            <div className="p-4">
                <p className="text-neutral-400 text-sm">
                    {t('bookingDate')} 16 Feb 2023 - 08.08
                </p>
            </div>
        </section>
    );
}
