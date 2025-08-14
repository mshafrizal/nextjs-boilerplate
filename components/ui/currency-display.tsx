'use client';
import useCurrency from '@/hooks/useCurrency';
import { cn } from '@/lib/utils';

interface CurrencyDisplayProps {
    price: number;
    className?: string;
}
export default function CurrencyDisplay(props: Readonly<CurrencyDisplayProps>) {
    const { formatPrice } = useCurrency();
    return (
        <p
            className={cn(
                'text-yellow-200 text-[18px] font-semibold',
                props.className
            )}
        >
            {formatPrice(props.price)}
        </p>
    );
}
