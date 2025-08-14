'use client';
import { CalendarDay, Modifiers } from 'react-day-picker';
import { type ButtonHTMLAttributes, useMemo } from 'react';
import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { isToday } from 'date-fns/isToday';

export type DayButtonProps = {
    /** The day to render. */
    day: CalendarDay;
    /** The modifiers to apply to the day. */
    modifiers: Modifiers;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function CustomDayButton(props: Readonly<DayButtonProps>) {
    const { day, className, style, modifiers, ...rest } = props;
    const searchParams = useSearchParams();
    const hotel = useMemo(() => searchParams.get('hotel'), [searchParams]);
    // Determine if this day is selected, today, or has a price
    const isSelected = modifiers.selected;
    const startRange = modifiers.range_start;
    const endRange = modifiers.range_end;
    const formattedPrice = useMemo(
        () => (hotel && !modifiers.disabled ? 'Rp 4.500.000' : ''),
        [hotel, modifiers.disabled]
    );
    const today = new Date();
    const isNowOrTomorrowDate = useMemo(() => {
        return day.date.getTime() > today.getTime() || isToday(day.date);
    }, [today, day]);
    return (
        <button
            className={`relative flex flex-col! items-center! justify-start! py-2! gap-1! ${modifiers.disabled ? 'pointer-events-none cursor-not-allowed bg-neutral-200 text-neutral-300' : ''} ${!isNowOrTomorrowDate ? 'cursor-not-allowed! pointer-events-none' : ''} ${className ?? ''}`}
            style={style}
            {...rest}
        >
            <div
                className={`text-base font-medium ${isSelected ? 'text-white' : ''}`}
            >
                {day.date.getDate()}
            </div>
            <div
                className={`text-sm mt-1 text-wrap ${isSelected ? 'text-white' : 'text-neutral-600'}`}
            >
                {!startRange && !endRange && isNowOrTomorrowDate
                    ? formattedPrice
                    : ''}
                {startRange && 'Check In'}
                {!startRange && endRange && 'Check Out'}
            </div>
        </button>
    );
}
