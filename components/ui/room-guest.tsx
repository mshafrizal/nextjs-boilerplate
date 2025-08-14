'use client';

import {
    HTMLAttributes,
    useEffect,
    useRef,
    useState,
    forwardRef,
    useImperativeHandle,
} from 'react';
import RoomIcon from '@/components/icons/room-icon';
import { useSearchParams } from 'next/navigation';
import RoomGuestInput from '@/components/ui/room-guest-input';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import useCounter from '@/hooks/useCounter';
import { cn } from '@/lib/utils';

const parseParamValue = (
    param: string | null,
    defaultValue: number
): number => {
    if (!param) return defaultValue;
    const parsed = parseInt(param);
    return isNaN(parsed) ? defaultValue : Math.abs(parsed);
};

export interface RoomGuestInputProps {
    increment: () => void;
    decrement: () => void;
    decrementDisabled: boolean;
    value: number;
}

export interface RoomGuestRef {
    rooms: number;
    adults: number;
    children: number;
    infants: number;
}
interface RoomGuestProps extends HTMLAttributes<HTMLDivElement> {
    buttonClassName?: string;
    type: 'TYPE_1' | 'TYPE_2';
    onStateChange?: (params: URLSearchParams) => void;
}
const RoomGuest = forwardRef<RoomGuestRef, RoomGuestProps>(
    ({ buttonClassName, type = 'TYPE_1', ...props }, ref) => {
        const searchParams = useSearchParams();
        const t = useTranslations('Home');
        const pathname = usePathname();
        const router = useRouter();
        const [open, setOpen] = useState(false);

        const roomsParam = parseParamValue(searchParams.get('rooms'), 1);
        const adultsParam = parseParamValue(searchParams.get('adults'), 1);
        const childParam = parseParamValue(searchParams.get('children'), 0);
        const infantParam = parseParamValue(searchParams.get('infants'), 0);

        const rooms = useCounter(roomsParam, 1);
        const adults = useCounter(adultsParam, 1);
        const children = useCounter(childParam, 0);
        const infants = useCounter(infantParam, 0);

        useImperativeHandle(
            ref,
            () => ({
                rooms: rooms.value,
                adults: adults.value,
                children: children.value,
                infants: infants.value,
            }),
            [rooms.value, adults.value, children.value, infants.value]
        );

        useEffect(() => {
            const params = new URLSearchParams(searchParams.toString());
            params.set('rooms', rooms.value.toString());
            params.set('adults', adults.value.toString());
            params.set('children', children.value.toString());
            params.set('infants', infants.value.toString());
            if (props.onStateChange) {
                props.onStateChange(params);
            } else {
                router.replace({
                    pathname: pathname + '?' + params.toString(),
                });
            }
        }, [
            rooms.value,
            adults.value,
            children.value,
            infants.value,
            searchParams,
        ]);

        // Click outside handler
        const roomGuestRef = useRef<HTMLDivElement>(null);
        useEffect(() => {
            function handleClickOutside(event: any) {
                if (
                    roomGuestRef.current &&
                    !roomGuestRef.current?.contains?.(event.target)
                ) {
                    setOpen(false);
                }
            }
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, [roomGuestRef]);

        const summaryText = `
        ${rooms.value} Room(s), ${adults.value} Adult(s)
        ${children.value > 0 ? `, ${children.value} Child(s)` : ''}
        ${infants.value > 0 ? `, ${infants.value} Infant(s)` : ''}
    `.trim();

        const renderButton = () => {
            switch (type) {
                case 'TYPE_1':
                    return (
                        <button
                            className={
                                'bg-white border border-neutral-200 rounded-md min-h-16 h-full w-full flex items-center gap-4 px-4 py-2  cursor-pointer'
                            }
                            onClick={() => setOpen(!open)}
                        >
                            <RoomIcon className="text-brand-01" />
                            <div className="flex flex-col items-start gap-1 text-left">
                                <p className="text-sm text-neutral-500">
                                    Rooms & Guests
                                </p>
                                <p className="text-neutral-600 font-semibold">
                                    {summaryText}
                                </p>
                            </div>
                        </button>
                    );
                case 'TYPE_2':
                    return (
                        <button
                            className={
                                'bg-neutral-100 border border-neutral-200 rounded-md h-full lg:h-12 w-full flex items-center gap-4 px-4 py-2  cursor-pointer'
                            }
                            onClick={() => setOpen(!open)}
                        >
                            <RoomIcon className="text-brand-01" />
                            <div className="flex flex-col lg:flex-row justify-between text-left w-full">
                                <p className="text-sm text-neutral-500 font-medium hidden md:block">
                                    Rooms & Guests
                                </p>
                                <p className="text-sm text-neutral-600 font-semibold">
                                    {summaryText}
                                </p>
                            </div>
                        </button>
                    );
                default:
                    return (
                        <button
                            className={
                                'bg-white border border-neutral-200 rounded-md min-h-16 h-full w-full flex items-center gap-4 px-4 py-2  cursor-pointer'
                            }
                            onClick={() => setOpen(!open)}
                        >
                            <RoomIcon className="text-brand-01" />
                            <div className="flex flex-col items-start gap-1 text-left">
                                <p className="text-sm text-neutral-500">
                                    Rooms & Guests
                                </p>
                                <p className="text-neutral-600 font-semibold">
                                    {summaryText}
                                </p>
                            </div>
                        </button>
                    );
            }
        };

        return (
            <div
                className={cn(
                    'relative w-full flex items-center z-10',
                    props.className
                )}
                id="room-guest"
                ref={roomGuestRef}
                data-testid={'room-guest'}
            >
                {renderButton()}

                <div
                    className={`absolute top-24 lg:top-16 ${open ? 'block' : 'hidden'} w-full`}
                >
                    <div
                        className={
                            'bg-white border border-neutral-200 rounded-md shadow-sm p-4 flex flex-col gap-2'
                        }
                    >
                        <RoomGuestInput
                            increment={rooms.increment}
                            decrement={rooms.decrement}
                            decrementDisabled={rooms.isDecrementDisabled}
                            value={rooms.value}
                            title={t('rooms')}
                            description={t('roomsDesc')}
                        />
                        <hr />
                        <RoomGuestInput
                            increment={adults.increment}
                            decrement={adults.decrement}
                            decrementDisabled={adults.isDecrementDisabled}
                            value={adults.value}
                            title={t('adults')}
                            description={t('adultsDesc')}
                        />
                        <hr />
                        <RoomGuestInput
                            increment={children.increment}
                            decrement={children.decrement}
                            decrementDisabled={children.isDecrementDisabled}
                            value={children.value}
                            title={t('children')}
                            description={t('childrenDesc')}
                        />
                        <hr />
                        <RoomGuestInput
                            increment={infants.increment}
                            decrement={infants.decrement}
                            decrementDisabled={infants.isDecrementDisabled}
                            value={infants.value}
                            title={t('infants')}
                            description={t('infantsDesc')}
                        />
                    </div>
                </div>
            </div>
        );
    }
);

RoomGuest.displayName = 'RoomGuest';

export default RoomGuest;
