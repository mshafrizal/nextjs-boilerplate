'use client';

import CurrencyDisplay from '@/components/ui/currency-display';
import { Minus, Plus } from 'lucide-react';
import { HTMLAttributes } from 'react';
interface ExtraItemProps extends HTMLAttributes<HTMLDivElement> {
    label: string;
    description: string;
    price: number;
    value: number;
    increment: () => void;
    decrement: () => void;
    incrementDisabled?: boolean;
    decrementDisabled?: boolean;
}
export default function ExtraItem(props: Readonly<ExtraItemProps>) {
    return (
        <div className="flex flex-col md:flex-row border md:justify-between md:items-center border-neutral-200 rounded-sm p-4">
            <div className="flex flex-col">
                <p className="text-sm font-medium text-neutral-600 mb-[2px]">
                    {props.label}
                </p>
                <p className="text-neutral-400 text-sm mb-2">
                    {props.description}
                </p>
                <CurrencyDisplay price={props.price} />
            </div>
            <div className="flex flex-nowrap h-11 mt-2 md:mt-0">
                <button
                    id="extra-decrement"
                    data-testid="extra-decrement"
                    className="cursor-pointer disabled:cursor-not-allowed bg-neutral-50 p-[10px]"
                    onClick={props.decrement}
                    disabled={props.decrementDisabled}
                >
                    <Minus
                        size={24}
                        className={`${props.decrementDisabled ? 'text-[#E2E9F5]' : 'text-brand-01'} rounded-l-sm`}
                    />
                </button>
                <div
                    className={`bg-neutral-50 text-sm flex items-center text-center p-[10px] border-x border-neutral-100 font-medium ${props.value > 0 ? 'text-neutral-500' : 'text-neutral-200'}`}
                >
                    {props.value}
                </div>
                <button
                    id="extra-increment"
                    data-testid="extra-increment"
                    className="cursor-pointer disabled:cursor-not-allowed bg-neutral-50 p-[10px]"
                    onClick={props.increment}
                    disabled={props.incrementDisabled}
                >
                    <Plus
                        size={24}
                        className={`${props.incrementDisabled ? 'text-[#E2E9F5]' : 'text-brand-01'} rounded-r-sm`}
                    />
                </button>
            </div>
        </div>
    );
}
