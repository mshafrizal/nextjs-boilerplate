import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

// Base styles for the button
export const buttonBaseStyles =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium transition-all disabled:pointer-events-none disabled:bg-neutral-200 disabled:text-neutral-300 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer disabled:cursor-not-allowed disabled:border-none focus-visible:ring-0 dark:focus-visible:ring-0";

// Variant options
export const buttonVariantOptions = {
    default: 'bg-brand-01 text-white shadow-xs hover:bg-brand-01/90',
    destructive:
        'bg-destructive text-white shadow-xs hover:bg-destructive/90 dark:bg-destructive/60',
    outline:
        'border border-brand-01 bg-background shadow-xs text-brand-01 hover:bg-brand-01/10 dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
    secondary: 'bg-yellow-00 text-yellow-200 shadow-xs hover:bg-yellow-00/80',
    ghost: 'text-brand-01 hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
    link: 'text-primary underline-offset-4 hover:underline',
} as const;

// Define type for button variants
export type ButtonVariant = keyof typeof buttonVariantOptions;

// Size options
export const buttonSizeOptions = {
    default: 'h-9 px-4 py-2 has-[>svg]:px-3',
    sm: 'h-8 rounded-sm gap-1.5 px-3 has-[>svg]:px-2.5',
    lg: 'h-10 rounded-sm px-6 has-[>svg]:px-4',
    icon: 'size-9',
} as const;

// Define type for button sizes
export type ButtonSize = keyof typeof buttonSizeOptions;

// Default variants
export const buttonDefaultVariants: {
    variant: ButtonVariant;
    size: ButtonSize;
} = {
    variant: 'default',
    size: 'default',
};

// Button variants configuration
const buttonVariants = cva(buttonBaseStyles, {
    variants: {
        variant: buttonVariantOptions,
        size: buttonSizeOptions,
    },
    defaultVariants: buttonDefaultVariants,
});

function Button({
    className,
    variant = buttonDefaultVariants.variant,
    size = buttonDefaultVariants.size,
    asChild = false,
    ...props
}: Readonly<
    React.ComponentProps<'button'> &
        VariantProps<typeof buttonVariants> & {
            asChild?: boolean;
        }
>) {
    const Comp = asChild ? Slot : 'button';

    return (
        <Comp
            data-slot="button"
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
        />
    );
}

export { Button, buttonVariants };
