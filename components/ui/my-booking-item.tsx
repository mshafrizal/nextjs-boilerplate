'use client';

import { Link } from '@/i18n/navigation';
import HotelIcon from '@/components/icons/hotel-icon';
import { useMemo } from 'react';
import { formatBookingDate, formatNumberWithPrefix } from '@/lib/formatters';
import Image from 'next/image';
import bca from '@/app/bca.png';
import mastercard from '@/app/mastercard.png';
import jcb from '@/app/jcb.png';
import visa from '@/app/visa.png';
import amex from '@/app/amex.png';
import { useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { addSeconds, format } from 'date-fns';

export interface MyBookingItemProps {
    id: string;
    booking_number: string;
    property_name: string;
    property_id: string;
    room_qty: number;
    room_name: string;
    checkin_date: string; // yyyy-MM-dd
    checkout_date: string; // yyyy-MM-dd
    total_night: number;
    total_price: string;
    booking_status: 'UNPAID' | 'PAID' | 'CANCELLED' | 'FAILED' | 'EXPIRED';
    payment_method: string;
    booking_date: string;
}

export default function MyBookingItem(props: Readonly<MyBookingItemProps>) {
    const t = useTranslations('MyBooking');
    const locale = useLocale();
    const searchParams = useSearchParams();
    const BookingStatusMap = useMemo(() => {
        switch (props.booking_status) {
            case 'CANCELLED':
                return { label: 'Cancelled', color: 'text-danger-200' };
            case 'PAID':
                return {
                    label: 'Purchase Successful',
                    color: 'text-yellow-200',
                };
            case 'EXPIRED':
                return { label: 'Expired', color: 'text-danger-200' };
            case 'FAILED':
                return { label: 'Payment Failed', color: 'text-danger-200' };
            default:
                return { label: '-', color: 'text-neutral-600' };
        }
    }, [props.booking_status]);

    const isUpcoming = useMemo(() => {
        return Boolean(searchParams.get('tab') === 'upcoming');
    }, [searchParams]);

    const paymentExpiryTime = useMemo(() => {
        if (props.booking_status !== 'UNPAID' || !props.booking_date) {
            return null;
        }
        const expiryTimeConfig = process.env.NEXT_PUBLIC_PAYMENT_EXPIRY_TIME;
        const amount = expiryTimeConfig ? parseInt(expiryTimeConfig) : 300;
        const newDate = addSeconds(props.booking_date, amount);

        return format(newDate, 'd MMM yyyy - HH.mm');
    }, [props.booking_status, props.booking_date]);

    return (
        <Link
            href={`/my-booking/${props.id}?status=${props.booking_status}&paymentMethod=${props.payment_method}&hotel=${props.property_id}&tab=${isUpcoming ? 'upcoming' : 'history'}`}
            className="shadow-sm rounded-sm"
            data-testid="booking-item"
        >
            <div className="rounded-t-sm border border-neutral-100 bg-neutral-50 px-3 py-2">
                <p className="text-neutral-400 text-sm">
                    Booking ID:{' '}
                    <span
                        className="font-medium text-neutral-500"
                        data-testid="booking-number"
                    >
                        {props.booking_number}
                    </span>
                </p>
            </div>
            <div className="bg-white flex flex-col p-3">
                <div className="flex gap-3 items-center">
                    <HotelIcon className="size-6 text-brand-01" />
                    <p
                        className="text-neutral-600 font-semibold text-lg"
                        data-testid="property-name"
                    >
                        {props.property_name}
                    </p>
                </div>
                <hr className="border border-neutral-100 mt-3 mb-2 mx-[18px]" />
                <div className="flex flex-col gap-2">
                    <p
                        className="text-neutral-600 font-medium"
                        data-testid="booked-room"
                    >{`(${props.room_qty}x) ${props.room_name}`}</p>
                    <p
                        className="text-neutral-400 text-sm"
                        data-testid="booking-date-night"
                    >
                        {`${formatBookingDate(
                            props.checkin_date,
                            props.checkout_date,
                            locale
                        )} - ${props.total_night} ${t('nights')}`}
                    </p>
                    {isUpcoming && (
                        <div className="py-1 flex justify-between items-center gap-3">
                            <p className="text-neutral-600 text-sm font-medium">
                                {props.payment_method.toLowerCase() === 'cc'
                                    ? 'Credit/Debit Card'
                                    : 'Virtual Account'}
                            </p>
                            <div className="flex justify-end items-center gap-2">
                                {props.payment_method.toLowerCase() ===
                                    'cc' && (
                                    <Image
                                        src={mastercard}
                                        alt={'Mastercard'}
                                        height={24}
                                        width={24}
                                    />
                                )}
                                {props.payment_method.toLowerCase() ===
                                    'cc' && (
                                    <Image
                                        src={visa}
                                        alt={'Visa'}
                                        height={8}
                                        width={29}
                                    />
                                )}
                                {props.payment_method.toLowerCase() ===
                                    'cc' && (
                                    <Image
                                        src={jcb}
                                        alt={'JCB'}
                                        height={20}
                                        width={24}
                                    />
                                )}
                                {props.payment_method.toLowerCase() ===
                                    'cc' && (
                                    <Image
                                        src={amex}
                                        alt={'Amex'}
                                        height={24}
                                        width={29}
                                    />
                                )}
                                {props.payment_method.toLowerCase() ===
                                    'va' && (
                                    <Image
                                        src={bca}
                                        alt={'BCA'}
                                        height={24}
                                        width={24}
                                    />
                                )}
                            </div>
                        </div>
                    )}
                    <p
                        className="text-brand-01 font-semibold text-lg"
                        data-testid="total-price"
                    >
                        {formatNumberWithPrefix(
                            parseInt(props.total_price),
                            'IDR',
                            ','
                        )}
                    </p>
                </div>
            </div>
            <div
                className={`rounded-b-sm border border-neutral-100 bg-neutral-50 px-3 py-2 text-xs flex items-center font-medium ${BookingStatusMap.color}`}
                data-testid="booking-status"
            >
                {props.booking_status !== 'UNPAID' && BookingStatusMap.label}
                {props.booking_status === 'UNPAID' && paymentExpiryTime && (
                    <p
                        id="payment-expiry-time"
                        className="bg-yellow-500 text-white text-xs rounded-full px-2 py-[2px] font-normal text-center sm:text-left"
                    >
                        Complete payment before {paymentExpiryTime}
                    </p>
                )}
            </div>
        </Link>
    );
}
