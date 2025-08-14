'use client';

import { useState } from 'react';
import { Button } from './button';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { Separator } from './separator';
const ResponsiveDialog = dynamic(
    () => import('@/components/ui/responsive-dialog'),
    { ssr: false }
);

export default function BookingDetailDetailModal() {
    const [open, setOpen] = useState(false);
    const t = useTranslations('BookingDetail');

    return (
        <ResponsiveDialog
            open={open}
            setOpen={setOpen}
            trigger={
                <Button variant="outline" className="h-12 w-full">
                    {t('seeBookingDetails')}
                </Button>
            }
            desktopChildren={<DialogContent />}
            mobileChildren={<DialogContent />}
            title={'Booking'}
            description={''}
            className="lg:max-w-[90%] xl:max-w-[1120px] max-h-[90%] p-0 overflow-y-scroll"
            onlyCloseFromButton={true}
        />
    );
}
function DialogContent() {
    const t = useTranslations('BookingDetail');
    return (
        <div className="overflow-y-scroll">
            <h2 className="h2 border-b border-neutral-200 p-4">{t('title')}</h2>
            <div className="p-4 flex flex-col lg:flex-row gap-3">
                <div className="border border-neutral-200 rounded-sm p-4 col-span-2 flex flex-col lg:max-w-[60%]">
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-lg font-semibold">
                            Padma Resort Ubud
                        </p>
                        <p className="text-neutral-500 text-sm text-right">
                            Mountain Gateway - 59m<sup>2</sup>
                        </p>
                    </div>
                    <div className="py-1 mb-3">
                        <h3 className="text-neutral-600 text-lg font-semibold mb-2">
                            {t('reservationSummary')}
                        </h3>
                        <p className="text-neutral-400 text-sm font-medium mb-2">
                            (2x) Mountain Gateway Advance Purchase Rate
                        </p>
                        <p className="text-neutral-400 text-sm font-medium">
                            (1x) Extra Bed
                        </p>

                        <hr className="border border-neutral-200 my-2" />

                        <div className="flex justify-between items-center mb-3">
                            <p className="text-neutral-400">
                                {t('guestPerRoom')}
                            </p>
                            <p className="text-neutral-600 font-medium">
                                2 adults 1 children 1 infant
                            </p>
                        </div>
                        <div className="flex justify-between items-center mb-3">
                            <p className="text-neutral-400">
                                {t('bookingDate')}
                            </p>
                            <p className="text-neutral-600 font-medium">
                                16 February 2023, 8.08AM
                            </p>
                        </div>
                        <div className="flex justify-between items-center mb-3">
                            <p className="text-neutral-400">{t('bookingID')}</p>
                            <p className="text-neutral-600 font-medium">
                                BK0874634YT
                            </p>
                        </div>

                        <hr className="border border-neutral-200 my-2" />

                        <div className="py-2 grid grid-cols-3">
                            <div className="flex flex-col gap-1 text-left">
                                <p className="text-neutral-400 font-medium text-xs">
                                    {t('checkin')}
                                </p>
                                <p className="text-neutral-600 font-medium">
                                    Wed, 22 Feb 2023 - 3PM
                                </p>
                            </div>
                            <div className="flex justify-center items-center">
                                <Separator
                                    orientation="vertical"
                                    className="max-h-[27px] text-neutral-200"
                                />
                            </div>
                            <div className="flex flex-col gap-1 text-left">
                                <p className="text-neutral-400 font-medium text-xs">
                                    {t('checkout')}
                                </p>
                                <p className="text-neutral-600 font-medium">
                                    Thu, 23 Feb 2023 - 12PM
                                </p>
                            </div>
                        </div>

                        <hr className="border border-neutral-200 my-2" />

                        <div className="flex flex-col gap-3">
                            <p className="text-neutral-500 font-medium">
                                {t('priceByDate')}
                            </p>
                            <div className="flex justify-between">
                                <p className="text-neutral-400">22 Feb 2023</p>
                                <p className="text-neutral-600 font-medium">
                                    Rp3.603.000
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="py-1 mb-3">
                        <h3 className="text-neutral-600 font-semibold text-lg mb-3">
                            {t('inclusion')}
                        </h3>
                        <p className="text-neutral-500">
                            Breakfast, Club Benefits, complimentary Wi-Fi access
                            throughout the resort, return airport transfers for
                            min. 2 nights (please provide flight details to the
                            hotel no later than 72-Hours prior to arrival or
                            pick-up service will not be provided), 10% Discount
                            for any Theme Dinner (except Christmas and New
                            Year&apos;s Eve Dinner) and all applicable taxes..
                        </p>
                    </div>
                    <div className="py-1">
                        <h3 className="text-neutral-600 font-semibold text-lg mb-3">
                            {t('guestDetails')}
                        </h3>
                        <div>
                            <p className="mb-2 text-neutral-600 font-medium">
                                Room 1
                            </p>
                            <div className="text-neutral-500 text-sm">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className="pb-3">Adult 1</td>
                                            <td className="px-2 pb-3">:</td>
                                            <td className="pb-3">John Doe</td>
                                        </tr>
                                        <tr>
                                            <td className="pb-3">Adult 2</td>
                                            <td className="px-2 pb-3">:</td>
                                            <td className="pb-3">
                                                Elisabeth Doe
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="pb-3">Child 1</td>
                                            <td className="px-2 pb-3">:</td>
                                            <td className="pb-3">Walter Doe</td>
                                        </tr>
                                        <tr>
                                            <td className="pb-3">Infant 1</td>
                                            <td className="px-2 pb-3">:</td>
                                            <td className="pb-3">Eliza Doe</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <hr className="border border-neutral-200 mb-3" />

                        <div>
                            <p className="mb-2 text-neutral-600 font-medium">
                                Room 2
                            </p>
                            <div className="text-neutral-500 text-sm">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className="pb-3">Adult 1</td>
                                            <td className="px-2 pb-3">:</td>
                                            <td className="pb-3">John Doe</td>
                                        </tr>
                                        <tr>
                                            <td className="pb-3">Adult 2</td>
                                            <td className="px-2 pb-3">:</td>
                                            <td className="pb-3">-</td>
                                        </tr>
                                        <tr>
                                            <td className="pb-3">Child 1</td>
                                            <td className="px-2 pb-3">:</td>
                                            <td className="pb-3">-</td>
                                        </tr>
                                        <tr>
                                            <td className="pb-3">Infant 1</td>
                                            <td className="px-2 pb-3">:</td>
                                            <td className="pb-3">-</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border border-neutral-200 rounded-sm py-4 flex flex-col h-fit gap-4 col-span-1 lg:max-w-[40%]">
                    <div className="px-4">
                        <p className="text-lg font-semibold py-1 mb-2">
                            {t('specialRequest')}
                        </p>
                        <p className="text-sm text-neutral-500 mb-3">
                            Non-smoking room and connecting rooms
                        </p>
                        <p className="text-neutral-600 font-medium mb-2">
                            {t('cancellationAndModification')}
                        </p>
                        <ul className="ml-5 mb-1 text-sm">
                            <li className="list-disc">
                                Free cancellation until 20 February 2024, at 6
                                PM (local time).
                                <br />
                                Cancellations made after this time will result
                                in forfeiture of the room deposit and points.
                            </li>
                            <li className="list-disc">
                                This reservation can be modified until 10 March
                                2024, at 6PM (local time).
                            </li>
                        </ul>
                    </div>
                    <div>
                        <p className="text-lg font-semibold py-1 mt-1 mb-4 px-4">
                            {t('priceDetails')}
                        </p>
                        <div className="flex justify-between items-center py-2 px-4">
                            <p className="max-w-3/5 text-left text-wrap text-neutral-300">
                                (2x) Mountain Gateway Advance Purchase Rate
                            </p>
                            <p className="max-w-2/5 text-right text-neutral-500">
                                IDR 6.603.000
                            </p>
                        </div>
                        <div className="flex justify-between items-center py-2 px-4">
                            <p className="max-w-3/5 text-left text-wrap text-neutral-300">
                                (1x) Extra Bed
                            </p>
                            <p className="max-w-2/5 text-right text-neutral-500">
                                IDR 125.000
                            </p>
                        </div>
                        <div className="flex justify-between items-center py-2 px-4">
                            <p className="max-w-3/5 text-left text-wrap text-neutral-300">
                                {t('totalPrice')}
                            </p>
                            <p className="max-w-2/5 text-right text-neutral-500">
                                IDR 6.779.000
                            </p>
                        </div>
                        <div className="flex justify-between items-center py-2 px-4 bg-neutral-50 border-y border-neutral-100">
                            <p className="text-neutral-500 font-medium">
                                {t('paidAmount')}
                            </p>
                            <p className="text-neutral-600 font-semibold text-right">
                                IDR 6.779.000
                            </p>
                        </div>
                        <p className="text-sm text-neutral-500 px-4 py-3">
                            IDR 6,116,800 Payment will be completed upon check
                            in
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
