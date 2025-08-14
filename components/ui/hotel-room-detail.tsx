'use client';

import Image from 'next/image';
import Room1 from '@/app/rooms_1.png';
import { Circle } from 'lucide-react';
import { useParams, useSearchParams } from 'next/navigation';
import { format } from 'date-fns';
import { usePathname, useRouter } from '@/i18n/navigation';
import RateTag from '@/components/ui/rate-tag';
import SeeRoomButton from '@/components/ui/see-room-button';
import { useMemo, useCallback, memo } from 'react';
import HotelRoomPrice from '@/components/ui/hotel-room-price';

// Helper function to parse date string in DD/MM/YYYY format
const parseDateString = (dateString: string): Date => {
    const [day, month, year] = dateString.split('/');
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
};

// Helper function to generate date range
const generateDateRange = (
    startDate: Date,
    endDate: Date,
    additionalDays: number = 0
): Date[] => {
    const dates: Date[] = [];
    const end = new Date(endDate);
    end.setDate(endDate.getDate() + additionalDays);

    if (startDate > end) {
        throw new Error('Start date must be before or equal to end date');
    }

    const currentDate = new Date(startDate);
    while (currentDate <= end) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
};

export default function HotelRoomDetail() {
    const router = useRouter();
    const pathname = usePathname();
    const params = useParams() as unknown as { id: string };
    const searchParams = useSearchParams();
    const ratePlanPolicy = 'WJxbojagwO';
    const roomId = 'gl9avmeG1v';

    const startDateParam = searchParams.get('startDate');
    const endDateParam = searchParams.get('endDate');

    const dateRange = useMemo(() => {
        if (!startDateParam || !endDateParam) return [];

        try {
            const startDate = parseDateString(startDateParam);
            const endDate = parseDateString(endDateParam);
            return generateDateRange(startDate, endDate, 7); // Add 7 days after end date
        } catch (error) {
            console.error('Error generating date range:', error);
            return [];
        }
    }, [startDateParam, endDateParam]);

    const isSelectedDate = useCallback(
        (date: Date): boolean => {
            if (!startDateParam || !endDateParam) return false;

            try {
                const startDate = parseDateString(startDateParam);
                const endDate = parseDateString(endDateParam);
                return date >= startDate && date <= endDate;
            } catch (error) {
                console.error('Error checking selected date:', error);
                return false;
            }
        },
        [startDateParam, endDateParam]
    );

    const selectDate = useCallback(
        (date: Date) => {
            const query = new URLSearchParams(searchParams.toString());
            query.set('startDate', format(date, 'dd/MM/yyyy'));
            router.replace({ pathname, query: Object.fromEntries(query) });
        },
        [searchParams, pathname, router]
    );

    const DateButton = memo(
        ({
            date,
            isClickable = true,
        }: {
            date: Date;
            isClickable?: boolean;
        }) => {
            const dateString = format(date, 'dd/MM/yyyy');
            const isSelected = isSelectedDate(date);
            const dateId = format(date, 'yyyy-MM-dd');

            const buttonClass = `text-sm border border-neutral-200 px-2 h-32 flex flex-col gap-1 justify-center text-center ${
                isClickable ? 'cursor-pointer hover:bg-yellow-00/50' : ''
            } ${isSelected ? 'bg-yellow-00 border-brand-02' : ''}`;

            const content = (
                <>
                    <p className={`font-medium text-neutral-400`}>
                        {dateString}
                    </p>
                    <p
                        className="font-semibold text-neutral-600"
                        id={`${dateId}-price`}
                    >
                        Rp 1.400.000
                    </p>
                    <p
                        className="line-through text-neutral-400"
                        id={`${dateId}-base-price`}
                    >
                        Rp 2.150.000
                    </p>
                </>
            );

            return isClickable ? (
                <button
                    key={date.toString()}
                    className={buttonClass}
                    onClick={() => selectDate(date)}
                    aria-label={`Select ${dateString} at Rp 1.400.000`}
                >
                    {content}
                </button>
            ) : (
                <div key={date.toString()} className={buttonClass}>
                    {content}
                </div>
            );
        }
    );
    // Add display name to the DateButton component
    DateButton.displayName = 'DateButton';

    function onBookNow() {
        const url = `/reservation/${params.id}?${searchParams.toString()}&ratePlanId=${ratePlanPolicy}&roomId=${roomId}`;
        if (typeof window !== 'undefined') {
            localStorage.setItem('reservation-redirect-url', url);
        }
        router.push(url);
    }

    return (
        <li className="list-none bg-white p-4 rounded-sm">
            <h2 className="h2 mb-4">Deluxe Signature Twin Room</h2>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-y-4 lg:gap-y-0 lg:gap-x-4">
                {/* Room Image and Details */}
                <div className="border border-neutral-200 p-4 flex flex-col gap-4 rounded-sm col-span-1">
                    <Image
                        src={Room1}
                        alt="Deluxe Signature Twin Room - 32 sqm with twin beds"
                        width={240}
                        height={135}
                        className="aspect-video w-full"
                        priority
                    />
                    <p className="text-xs text-neutral-500 font-medium leading-4">
                        (32 sqm, twin beds (110 cm x 200 cm), en-suite bathroom
                        with rain shower) Step into a spacious and refreshing
                        contemporarily-designed room. (32 sqm, twin beds (110 cm
                        x 200 cm), en-suite bathroom with rain shower) Step into
                        a spacious and refreshing contemporarily-designed room.
                        (32 sqm, twin beds (110 cm x 200 cm), en-suite bathroom
                        with rain shower) Step into a spacious and refreshing
                        contemporarily-designed room.
                    </p>
                    <SeeRoomButton />
                </div>

                {/* Price Calendar */}
                <div className="border border-neutral-200 p-4 flex flex-col gap-2 rounded-sm col-span-2">
                    <div className="flex justify-between">
                        <h3 className="text-neutral-600 font-bold">
                            Price/Room
                        </h3>
                        <div className="flex items-center gap-2">
                            <Circle className="text-brand-02 bg-brand-02 rounded-full size-4" />
                            <p className="text-sm font-medium">Selected Date</p>
                        </div>
                    </div>
                    <div className="flex flex-col relative gap-2 overflow-x-auto scrollbar-thin scrollbar-neutral-200 pb-4">
                        {/* Non-Refundable Rate */}
                        <p className="text-sm text-neutral-600 font-semibold sticky left-0">
                            Non - Refundable Rate
                        </p>
                        <div className="flex w-full whitespace-nowrap">
                            {dateRange.map((date) => (
                                <DateButton
                                    key={date.toString()}
                                    date={date}
                                    isClickable={true}
                                />
                            ))}
                        </div>

                        {/* Refundable Rate */}
                        <p className="text-sm text-neutral-600 font-semibold sticky left-0">
                            Refundable Rate
                        </p>
                        <div className="flex w-full whitespace-nowrap">
                            {dateRange.map((date) => (
                                <DateButton
                                    key={date.toString()}
                                    date={date}
                                    isClickable={false}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Rate Options */}
                <div className="border border-neutral-200 p-4 flex flex-col gap-4 rounded-sm col-span-2">
                    <h2 className="h2">Rate Option(s)</h2>

                    {/* Non-Refundable Rate Option */}
                    <div className="flex flex-col gap-3">
                        <h3 className="font-semibold text-[18px] text-neutral-600">
                            Non - Refundable Rate
                        </h3>
                        <div className="flex gap-2">
                            <RateTag
                                label={'Best Value'}
                                className={'bg-yellow-100'}
                            />
                            <RateTag
                                label={'Bed & Breakfast'}
                                className={'bg-neutral-300'}
                            />
                        </div>
                        <p className="text-neutral-500 text-sm">
                            Rate inclusions: Daily breakfast, Internet access,
                            and all applicable taxes.
                        </p>
                        <div className="flex justify-between items-center sm:justify-end gap-2 sm:gap-4">
                            <div className="text-left sm:text-right">
                                <HotelRoomPrice
                                    originalPrice={4300000}
                                    discountedPrice={2800000}
                                    className="justify-start sm:justify-end"
                                />
                                <p className="mt-1 sm:mt-0 text-xs text-neutral-400">
                                    Includes all taxes & fees
                                </p>
                            </div>
                            <button
                                onClick={onBookNow}
                                className="text-white bg-brand-01 text-sm px-5 py-[10px] rounded-sm font-semibold cursor-pointer"
                            >
                                Book Now
                            </button>
                        </div>
                    </div>

                    {/* Refundable Rate Option */}
                    <div className="flex flex-col gap-3">
                        <h3 className="font-semibold text-[18px] text-neutral-600">
                            Refundable Rate
                        </h3>
                        <div className="flex gap-2">
                            <RateTag
                                label={'Best Value'}
                                className={'bg-yellow-100'}
                            />
                            <RateTag
                                label={'Bed & Breakfast'}
                                className={'bg-neutral-300'}
                            />
                        </div>
                        <p className="text-neutral-500 text-sm">
                            Rate inclusions: Daily breakfast, Internet access,
                            and all applicable taxes.
                        </p>
                        <div className="flex justify-between items-center sm:justify-end gap-2 sm:gap-4">
                            <div className="text-left sm:text-right">
                                <HotelRoomPrice
                                    originalPrice={5600000}
                                    discountedPrice={4000000}
                                    className="justify-start sm:justify-end"
                                />
                                <p className="mt-1 sm:mt-0 text-xs text-neutral-400">
                                    Includes all taxes & fees
                                </p>
                            </div>
                            <button
                                onClick={onBookNow}
                                className="text-white bg-brand-01 text-sm px-5 py-[10px] rounded-sm font-semibold cursor-pointer"
                            >
                                Book Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
}
