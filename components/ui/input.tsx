import * as React from 'react';

import { cn } from '@/lib/utils';
import EyeHiddenIcon from '@/components/icons/eye-hidden-icon';
import EyeOpenIcon from '@/components/icons/eye-open-icon';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
    return (
        <input
            type={type}
            data-slot="input"
            className={cn(
                'file:text-foreground placeholder:text-neutral-400 text-neutral-600 selection:bg-primary selection:text-primary-foreground dark:bg-input/30 flex h-12 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:border-neutral-300 md:text-base border-neutral-300',
                'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
                className
            )}
            {...props}
        />
    );
}
interface PasswordInputProps extends React.ComponentProps<'input'> {
    withLabel?: boolean;
    label?: string | React.ReactNode;
}
function PasswordInput({ withLabel, ...props }: Readonly<PasswordInputProps>) {
    const [type, setType] = React.useState('password');
    return (
        <div className={'relative'}>
            {withLabel ? (
                <LabeledInput {...props} type={type} />
            ) : (
                <Input {...props} type={type} />
            )}
            {type === 'password' && (
                <EyeHiddenIcon
                    className={cn(
                        'text-neutral-300 absolute right-0 -translate-x-2 top-0 translate-y-[12px] cursor-pointer',
                        props['aria-modal'] ? 'z-60' : 'z-10'
                    )}
                    onClick={() => setType('text')}
                />
            )}
            {type === 'text' && (
                <EyeOpenIcon
                    className={cn(
                        'text-neutral-300 absolute right-0 -translate-x-2 top-0 translate-y-[12px] cursor-pointer',
                        props['aria-modal'] ? 'z-60' : 'z-10'
                    )}
                    onClick={() => setType('password')}
                />
            )}
        </div>
    );
}

export interface LabeledInputProps extends React.ComponentProps<'input'> {
    label?: string | React.ReactNode;
}

function LabeledInput({ ...props }: Readonly<LabeledInputProps>) {
    return (
        <div className={'relative group'}>
            <Input
                {...props}
                className={cn('peer input', props.className)}
                placeholder={' '}
            />
            <label
                className={cn(
                    'label absolute text-base text-neutral-300 dark:text-gray-400 rounded-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 line-clamp-1',
                    'peer-focus:px-2 peer-focus:text-brand-01 peer-focus:dark:text-brand-01 ',
                    'peer-[:not(:placeholder-shown)]:text-brand-01',
                    'peer-placeholder-shown:scale-100 ',
                    'peer-placeholder-shown:-translate-y-1/2 ',
                    'peer-placeholder-shown:top-1/2 ',
                    'peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 ',
                    'rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1',
                    'peer-disabled:bg-neutral-200 peer-disabled:text-yellow-150!'
                )}
                htmlFor={props.id}
            >
                {props.label ?? props.placeholder}
                {props.required && (
                    <span className="required-asterisk"> *</span>
                )}
            </label>
        </div>
    );
}

export { Input, PasswordInput, LabeledInput };
