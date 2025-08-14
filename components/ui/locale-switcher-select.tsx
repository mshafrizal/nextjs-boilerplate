'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { ReactNode, useTransition } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import * as React from 'react';

type Props = {
    children: ReactNode;
    defaultValue: string;
    label: string;
};

export default function LocaleSwitcherSelect({
    children,
    defaultValue,
}: Readonly<Props>) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const pathname = usePathname();
    const params = useParams();
    const searchParams = useSearchParams();

    function onSelectChange(locale: string) {
        const nextLocale = locale;
        if (
            typeof window !== 'undefined' &&
            typeof sessionStorage !== 'undefined'
        ) {
            sessionStorage.clear();
        }
        startTransition(() => {
            const query = new URLSearchParams(searchParams.toString());
            router.replace(
                // @ts-expect-error -- TypeScript will validate that only known `params`
                // are used in combination with a given `pathname`. Since the two will
                // always match for the current route, we can skip runtime checks.
                { pathname, params, query: Object.fromEntries(query) },
                { locale: nextLocale }
            );
        });
    }

    return (
        <Select
            defaultValue={defaultValue}
            disabled={isPending}
            onValueChange={onSelectChange}
        >
            <SelectTrigger
                className={
                    'border-none shadow-none font-medium text-sm text-neutral-600 locale-switcher px-0'
                }
                chevronDownClassName="opacity-100 text-neutral-600 size-4 "
            >
                <SelectValue placeholder={defaultValue} />
            </SelectTrigger>
            <SelectContent>{children}</SelectContent>
        </Select>
    );
}
