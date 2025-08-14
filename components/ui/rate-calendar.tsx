'use client';
import SeparatorIcon from '@/components/icons/separator-icon';
import RateCalendarHotelSelect from '@/components/ui/rate-calendar-hotel-select';
import { DateRange } from 'react-day-picker';
import { useState } from 'react';
import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import CustomCalendarDesktop from '@/components/ui/custom-calendar-desktop';

interface RateCalendarProps {
    onSelect: (data: {
        property_id: string;
        stay_date: DateRange | undefined;
    }) => void;
    isAuthenticated: boolean;
}

export default function RateCalendar(props: Readonly<RateCalendarProps>) {
    const t = useTranslations('Home');
    const params = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const propertyCode = params.get('propertyCode');
    const hotel = params.get('hotel');
    const [property, setProperty] = useState(propertyCode ?? hotel ?? '');
    const onHotelSelect = (value: string) => {
        setProperty(value);
        router.push({
            pathname: pathname,
            query: {
                hotel: value,
            },
        });
    };
    return (
        <section
            id="rate-calendar"
            data-testid="rate-calendar mx-auto max-w-5xl text-center"
        >
            <h2 className="h2 mb-6 text-center">{t('stayDate')}</h2>

            {!propertyCode && (
                <div
                    id="rate-calendar-hotel-select"
                    className="grid grid-cols-3 items-center"
                >
                    <SeparatorIcon className="mx-auto text-neutral-300 max-w-3/4 xl:max-w-5/6" />
                    <RateCalendarHotelSelect
                        value={property}
                        setValue={onHotelSelect}
                    />
                    <SeparatorIcon className="mx-auto text-neutral-300 max-w-3/4 xl:max-w-5/6" />
                </div>
            )}

            <CustomCalendarDesktop
                property_id={property}
                onSelect={props.onSelect}
                isAuthenticated={props.isAuthenticated}
            />
        </section>
    );
}
