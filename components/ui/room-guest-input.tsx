'use client';

import { MinusCircle, PlusCircle } from 'lucide-react';
import { RoomGuestInputProps } from '@/components/ui/room-guest';

interface RoomGuestInputComponentProps extends RoomGuestInputProps {
    title: string;
    description: string;
}

export default function RoomGuestInput({
    increment,
    decrement,
    decrementDisabled,
    value,
    title,
    description,
}: Readonly<RoomGuestInputComponentProps>) {
    return (
        <div className="flex justify-between items-center py-2 px-4">
            <div className="block">
                <p className="mb-[2px] text-neutral-600 font-medium">{title}</p>
                <p className="text-neutral-400 text-sm">{description}</p>
            </div>
            <div className="flex gap-1 flex-nowrap">
                <button
                    className="cursor-pointer disabled:cursor-not-allowed"
                    onClick={decrement}
                    disabled={decrementDisabled}
                >
                    <MinusCircle
                        size={30}
                        className={`${decrementDisabled ? 'text-neutral-200' : 'text-brand-01'} rounded-full`}
                    />
                </button>
                <div className="w-7 h-7 text-center text-neutral-600 text-lg font-medium">
                    {value}
                </div>
                <button className="cursor-pointer" onClick={increment}>
                    <PlusCircle
                        size={30}
                        className="text-brand-01 rounded-full"
                    />
                </button>
            </div>
        </div>
    );
}
