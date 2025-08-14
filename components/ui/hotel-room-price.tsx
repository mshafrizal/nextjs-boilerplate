import { cn } from '@/lib/utils';
import useCurrency from '@/hooks/useCurrency';

interface BookingPriceDisplayProps {
    originalPrice: number;
    discountedPrice: number;
    className?: string;
}

export default function HotelRoomPrice({
    originalPrice,
    discountedPrice,
    className,
}: Readonly<BookingPriceDisplayProps>) {
    const { formatPrice, currency } = useCurrency();

    return (
        <div
            className={cn(
                'flex flex-wrap items-center justify-end gap-1',
                className
            )}
        >
            <p className="line-through text-neutral-300 text-xs">
                {formatPrice(originalPrice, currency)}
            </p>
            <p className="text-[18px] font-semibold text-yellow-150">
                {formatPrice(discountedPrice, currency)}
            </p>
        </div>
    );
}
