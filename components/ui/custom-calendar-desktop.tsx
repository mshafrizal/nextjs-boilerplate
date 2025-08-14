'use client';

import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { cn, countNights, parseDate } from '@/lib/utils';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
    CustomComponents,
    DateRange,
    DayPicker,
    getDefaultClassNames,
    Matcher,
    ModifiersClassNames,
    ModifiersStyles,
} from 'react-day-picker';
import { RoomRate } from '@/lib/room-rate';
import { endOfMonth, format, startOfMonth } from 'date-fns';
import {
    ChevronDownCircleIcon,
    ChevronLeftCircleIcon,
    ChevronRightCircleIcon,
} from 'lucide-react';
import CustomDayButton, {
    DayButtonProps,
} from '@/components/ui/rate-calendar-day-button';
import { formatNumberToRupiah } from '@/lib/formatters';
import InfoFilledIcon from '@/components/icons/info-filled-icon';
import { Button } from '@/components/ui/button';
import * as React from 'react';

interface CustomCalendarProps {
    property_id: string;
    onSelect: (data: {
        property_id: string;
        stay_date: DateRange | undefined;
    }) => void;
    isAuthenticated: boolean;
}

type CustomCalendarChevronProps = {
    className?: string;
    /**
     * The size of the chevron.
     *
     * @defaultValue 24
     */
    size?: number;
    /** Set to `true` to disable the chevron. */
    disabled?: boolean;
    /** The orientation of the chevron. */
    orientation?: 'up' | 'down' | 'left' | 'right';
};

const LOWEST_PRICE_GUEST_URL = '/v1/app/lowest-price/guest';
const LOWEST_PRICE_MEMBER_URL = '/v1/app/lowest-price';

export default function CustomCalendarDesktop({
    property_id,
    onSelect,
    isAuthenticated = false,
}: Readonly<CustomCalendarProps>) {
    const t = useTranslations('Home');
    const searchParams = useSearchParams();
    const spStartDate = parseDate(searchParams.get('startDate'));
    const spEndDate = parseDate(searchParams.get('endDate'));
    const today = new Date();
    const [month, setMonth] = useState(today);
    const defaultClassNames = getDefaultClassNames();
    const [stayDate, setStayDate] = useState<DateRange | undefined>({
        from: spStartDate ?? undefined,
        to: spEndDate ?? undefined,
    });
    const [rate, _] = useState<RoomRate>();
    const url = useMemo(
        () =>
            isAuthenticated ? LOWEST_PRICE_MEMBER_URL : LOWEST_PRICE_GUEST_URL,
        [isAuthenticated]
    );
    const fetchRates = async (startMonth?: Date, endMonth?: Date) => {
        console.log(url, startMonth, endMonth);
    };

    useEffect(() => {
        if (property_id)
            fetchRates().catch((e) => console.log('error fetching rates', e));
    }, [property_id]);

    async function onMonthChange(month: Date) {
        // fetch rate by month from parameter, if rate have been fetched, don't fetch
        setMonth(month);

        // Check if we already have rate data for this month to avoid unnecessary API calls
        const monthStart = startOfMonth(month);
        const monthEnd = endOfMonth(month);

        // If we already have rate data that covers this month, don't fetch again
        if (rate && rate.rate_plan_policies.length > 0) {
            const hasDataForMonth = rate.rate_plan_policies.some((policy) => {
                const policyStart = new Date(policy.date_from);
                const policyEnd = new Date(policy.date_to);
                return policyStart <= monthEnd && policyEnd >= monthStart;
            });

            if (hasDataForMonth) {
                return;
            }
        }

        await fetchRates(monthStart, monthEnd).catch((e) =>
            console.log('error fetching rates', e)
        );
    }

    const priceData: string[] | undefined = useMemo(
        () =>
            rate?.rate_plan_policies[0].detail_price_per_days.map(
                (day) => day.date
            ),
        [rate]
    );

    const customComponents: Partial<CustomComponents> | undefined = {
        Chevron: ({
            className,
            orientation,
            ...props
        }: Readonly<CustomCalendarChevronProps>) => {
            if (orientation === 'left') {
                return (
                    <ChevronLeftCircleIcon
                        className={cn('size-6', className)}
                        {...props}
                    />
                );
            }

            if (orientation === 'right') {
                return (
                    <ChevronRightCircleIcon
                        className={cn('size-6', className)}
                        {...props}
                    />
                );
            }

            return (
                <ChevronDownCircleIcon
                    className={cn('size-4', className)}
                    {...props}
                />
            );
        },
        DayButton: (props: Readonly<DayButtonProps>) => {
            return <CustomDayButton {...props} />;
        },
    };
    const customModifiers:
        | Record<string, Matcher | Matcher[] | undefined>
        | undefined = {
        hasPrice: (date) => {
            const dateString = date.toISOString().split('T')[0];
            if (!priceData?.length) {
                return false;
            }
            return priceData.includes(dateString);
        },
        disabled: (date) => {
            return date.getDate() > 10 && date.getDate() < 15;
        },
    };
    const customModifierClassName: ModifiersClassNames = {
        hasPrice: 'has-price',
    };
    const customModifiersStyle: ModifiersStyles = {
        hasPrice: {},
    };
    const getNightsCount = useCallback(
        (range?: DateRange): number => {
            const dateRange = range || stayDate;

            return countNights(dateRange);
        },
        [stayDate]
    );

    const isDisabled = useMemo(() => {
        if (!stayDate?.from || !stayDate.to) return true;
        const from = format(stayDate?.from, 'yyyy-MM-dd');
        const to = format(stayDate?.to, 'yyyy-MM-dd');
        return from === to;
    }, [stayDate]);

    const sumPrice = useMemo(() => {
        return formatNumberToRupiah(getNightsCount(stayDate) * 4500000);
    }, [property_id, stayDate]);

    return (
        <div>
            <DayPicker
                numberOfMonths={2}
                mode="range"
                navLayout={'around'}
                className="rate-calendar"
                classNames={{
                    month: `${defaultClassNames.month} w-full`,
                    month_caption: `${defaultClassNames.month_caption} text-neutral-500 font-medium`,
                    caption_label: `${defaultClassNames.caption_label} text-neutral-500 font-medium text-base uppercase`,
                    months: `${defaultClassNames.months} w-full max-w-none! flex-nowrap! justify-between gap-20`,
                    month_grid: `${defaultClassNames.month_grid} w-full`,
                    weekday: `${defaultClassNames.weekday} text-neutral-500 text-base`,
                    disabled: `${defaultClassNames.disabled} text-neutral-300`,
                    outside: `${defaultClassNames.outside} border-none`,
                }}
                disabled={{
                    before: today,
                }}
                startMonth={today}
                month={month}
                selected={stayDate}
                onSelect={setStayDate}
                onMonthChange={onMonthChange}
                components={customComponents}
                modifiers={customModifiers}
                modifiersClassNames={customModifierClassName}
                modifiersStyles={customModifiersStyle}
                formatters={{
                    formatWeekdayName(date) {
                        return format(date, 'ccc');
                    },
                }}
            />
            <div
                id="rate-calendar-footer"
                className="flex items-center justify-between"
            >
                <div className="flex items-center gap-10 mt-6 mb-4">
                    <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full border border-brand-01 bg-white flex items-center justify-center">
                            <div className="h-2 w-2 rounded-full bg-white"></div>
                        </div>
                        <span className="text-sm">{t('today')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full bg-brand-01 border border-brand-01"></div>
                        <span className="text-sm">{t('selected')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full bg-neutral-100 border border-neutral-100"></div>
                        <span className="text-sm">{t('soldOut')}</span>
                    </div>
                    {!property_id && (
                        <div className="flex items-center gap-2">
                            <InfoFilledIcon />
                            <span className="text-neutral-600 text-sm flex items-center gap-1">
                                {t('rateCalendarHint')}
                            </span>
                        </div>
                    )}
                </div>
                <div className="flex justify-between items-center mt-4 gap-6">
                    {stayDate?.from && stayDate?.to && property_id && (
                        <p className="text-right text-sm text-neutral-500">
                            Best price for {getNightsCount()} night(s){' '}
                            <span className="font-semibold text-xl text-neutral-600 ml-4">
                                {sumPrice.replace(' ', '')}
                            </span>
                        </p>
                    )}
                    <Button
                        className="h-12 disabled:bg-brand-02 disabled:text-white px-10"
                        disabled={isDisabled}
                        onClick={() =>
                            onSelect({ property_id, stay_date: stayDate })
                        }
                    >
                        {t('select')}
                    </Button>
                </div>
            </div>
        </div>
    );
}
