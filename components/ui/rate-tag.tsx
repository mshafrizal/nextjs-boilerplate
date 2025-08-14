import { cn } from '@/lib/utils';

interface RateTagProps {
    label: string;
    className?: string;
}

export default function RateTag({ label, className }: Readonly<RateTagProps>) {
    return (
        <p
            className={cn(
                `py-1 px-3 rounded-sm text-xs text-white bg-neutral-300`,
                className
            )}
        >
            {label}
        </p>
    );
}
