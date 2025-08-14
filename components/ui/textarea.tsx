import * as React from 'react';

import { cn } from '@/lib/utils';

interface TextAreaProps extends React.ComponentProps<'textarea'> {
    label?: string | React.ReactNode;
}
function Textarea({ className, ...props }: Readonly<TextAreaProps>) {
    return (
        <div className="relative group">
            <textarea
                data-slot="textarea"
                className={cn(
                    'peer textarea border-neutral-300 placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 sm:text-base shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50',
                    className
                )}
                {...props}
                placeholder={' '}
            />
            <label
                htmlFor={props.id}
                className={
                    'label absolute text-sm md:text-base text-neutral-300 dark:text-gray-400 rounded-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 ' +
                    'peer-focus:px-2 peer-focus:text-brand-01 peer-focus:dark:text-brand-01 ' +
                    'peer-not-placeholder-shown:text-brand-01 ' +
                    'peer-placeholder-shown:scale-100 ' +
                    'peer-placeholder-shown:-translate-y-1/2 ' +
                    'peer-placeholder-shown:top-4 ' +
                    'peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 ' +
                    'rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
                }
            >
                {props.label ?? props.placeholder}
                {props.required && (
                    <span className="required-asterisk"> *</span>
                )}
            </label>
        </div>
    );
}

export { Textarea };
