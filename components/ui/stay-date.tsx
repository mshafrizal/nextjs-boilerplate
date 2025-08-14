'use client';
import { useState, useMemo } from 'react';
import { DateRange, DayPicker, getDefaultClassNames } from 'react-day-picker';
import DateIcon from '@/components/icons/date-icon';
import { Button } from './button';
import { DrawerClose } from '@/components/ui/drawer';
import RateCalendar from '@/components/ui/rate-calendar';
import dynamic from 'next/dynamic';
import { countNights, parseDate } from '@/lib/utils';
import { usePathname, useRouter } from '@/i18n/navigation';
import { QueryParams } from 'next-intl/navigation';
import { useSearchParams } from 'next/navigation';
import { format } from 'date-fns';
import RateCalendarHotelSelect from '@/components/ui/rate-calendar-hotel-select';
import * as React from 'react';
import { useTranslations } from 'next-intl';
import { useResponsive } from '@/hooks/useResponsive';
const ResponsiveDialog = dynamic(
    () => import('@/components/ui/responsive-dialog'),
    { ssr: false }
);

// Default date constants
export const getDefaultDates = () => {
    const today = new Date();
    const tomorrow = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 1
    );
    return { today, tomorrow };
};

interface StayDateProps {
    isAuthenticated: boolean;
    className?: string;
}

export const StayDate = ({
    isAuthenticated,
    className,
}: Readonly<StayDateProps>) => {
    const t = useTranslations('Home');
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const propertyId = searchParams.get('hotel');
    const spStartDate = parseDate(searchParams.get('startDate'));
    const spEndDate = parseDate(searchParams.get('endDate'));
    // Memoize default dates to prevent recreation on every render
    const defaultDates = useMemo(() => getDefaultDates(), []);
    const { today, tomorrow } = defaultDates;
    const { isMobile } = useResponsive();

    const [open, setOpen] = useState(false);

    const [mobileProperty, setMobileProperty] = useState(propertyId ?? '');
    const [mobileRangeDate, setMobileRangeDate] = useState<
        DateRange | undefined
    >();
    const isMobileSaveDateDisabled = useMemo(() => {
        if (!mobileRangeDate?.from || !mobileRangeDate.to) return true;
        const from = format(mobileRangeDate?.from, 'yyyy-MM-dd');
        const to = format(mobileRangeDate?.to, 'yyyy-MM-dd');
        return from === to;
    }, [mobileRangeDate]);

    // Use useMemo to memoize the date values to prevent unnecessary re-renders
    const dateValues = useMemo(() => {
        return {
            from: spStartDate || today,
            to: spEndDate || tomorrow,
        };
    }, [spStartDate, spEndDate, today, tomorrow]);

    // Format date for display
    const formatDate = (date?: Date) => {
        return (
            date?.toLocaleDateString('id', {
                month: '2-digit',
                day: '2-digit',
                year: 'numeric',
            }) ?? ''
        );
    };

    const defaultClassNames = getDefaultClassNames();
    const trigger = (
        <div
            className={`w-full flex items-center ${className}`}
            id={'stay-date'}
            data-testid={'stay-date'}
        >
            <button
                className={
                    'bg-neutral-100 border border-neutral-200 rounded-md h-full lg:h-12 w-full flex items-center gap-4 px-4 py-3 cursor-pointer'
                }
                onClick={() => setOpen(!open)}
            >
                <DateIcon className="text-brand-01" />
                <div className="flex flex-col lg:flex-row text-left justify-between w-full">
                    <p className="text-sm text-neutral-500 hidden md:block">
                        Stay Date
                    </p>
                    <p className="text-sm text-neutral-600 font-semibold">
                        {formatDate(dateValues?.from)} -{' '}
                        {formatDate(dateValues?.to)}, {countNights(dateValues)}{' '}
                        night(s)
                    </p>
                </div>
            </button>
        </div>
    );
    const [_, setSelectedProperty] = useState(propertyId ?? '');
    const onSelectDate = (data: {
        property_id: string;
        stay_date: DateRange | undefined;
    }) => {
        const query: QueryParams = {
            startDate: formatDate(data.stay_date?.from),
            endDate: formatDate(data.stay_date?.to),
        };
        if (data.property_id) {
            setSelectedProperty(data.property_id);
            query['hotel'] = data.property_id;
        }
        router.replace({
            pathname: pathname,
            query: query,
        });
        setOpen(false);
    };
    return (
        <ResponsiveDialog
            open={open}
            setOpen={setOpen}
            title={'Stay Date'}
            description={''}
            className={'min-w-5/6 2xl:min-w-3/4 max-h-[90%] overflow-y-scroll'}
            trigger={trigger}
            showCloseButton={false}
            desktopChildren={
                <RateCalendar
                    onSelect={onSelectDate}
                    isAuthenticated={isAuthenticated}
                />
            }
            mobileChildren={
                <>
                    <RateCalendarHotelSelect
                        className="w-3/4 mx-auto my-2"
                        value={mobileProperty}
                        setValue={setMobileProperty}
                    />
                    <DayPicker
                        mode="range"
                        disabled={{ before: today }}
                        selected={mobileRangeDate}
                        onSelect={setMobileRangeDate}
                        className="mx-auto"
                        numberOfMonths={isMobile ? 1 : 2}
                        classNames={{
                            today: 'text-neutral-500 border border-brand-01',
                            selected: `bg-brand-01 border-brand-01 text-white rounded-0`, // Highlight the selected day
                            range_start: `bg-brand-01 text-white rounded-0`,
                            range_end: `bg-brand-01 text-white rounded-0`,
                            range_middle: `bg-brand-01/40`,
                            root: `${defaultClassNames.root}`,
                            chevron: `${defaultClassNames.chevron} fill-brand-01`, // Change the color of the chevron
                        }}
                    />
                    <DrawerClose asChild={true} className="block lg:hidden">
                        <div className="container mx-auto p-6">
                            <Button
                                className="w-full mx-auto"
                                disabled={isMobileSaveDateDisabled}
                                onClick={() => {
                                    onSelectDate({
                                        property_id: mobileProperty,
                                        stay_date: mobileRangeDate,
                                    });
                                }}
                            >
                                {t('save')}
                            </Button>
                        </div>
                    </DrawerClose>
                </>
            }
        />
    );
};
