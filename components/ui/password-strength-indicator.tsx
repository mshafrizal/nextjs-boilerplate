'use client';

import CheckCircleIcon from '@/components/icons/check-circle-icon';
import React from 'react';
import { useTranslations } from 'next-intl';
import { cn, passwordRegex } from '@/lib/utils';

interface PasswordStrengthIndicatorProps {
    password: string;
    className?: string;
    showMakeSure?: boolean;
}

export default function PasswordStrengthIndicator(
    props: Readonly<PasswordStrengthIndicatorProps>
) {
    const t = useTranslations('Auth.SignUp');
    return (
        <div
            className={cn(
                'flex flex-col gap-2 text-neutral-400',
                props.className
            )}
        >
            <div className="flex items-center gap-1">
                <div className="w-4 flex items-center">
                    <CheckCircleIcon
                        data-testid="password-len-check-circle"
                        className={
                            props.password.length >= 8 &&
                            props.password.length <= 20
                                ? 'text-brand-01'
                                : 'text-neutral-200'
                        }
                    />
                </div>
                <p className="text-xs sm:text-sm">{t('8-20characters')}</p>
            </div>
            <div className="flex items-start gap-1">
                <div className="w-4 pt-[2px]">
                    <CheckCircleIcon
                        data-testid="password-sym-check-circle"
                        className={
                            passwordRegex.test(props.password)
                                ? 'text-brand-01'
                                : 'text-neutral-200'
                        }
                    />
                </div>
                <p
                    className="text-xs sm:text-sm"
                    data-testid="password-error-msg"
                >
                    {t('passwordCombination')}
                </p>
            </div>
            {props.showMakeSure && (
                <p className="text-xs sm:text-sm">{t('makeSure')}</p>
            )}
        </div>
    );
}
