'use client';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import * as React from 'react';
import Image from 'next/image'; // Added missing import
import id from '@/components/flags/id.svg';
import en from '@/components/flags/en.svg';
import ar from '@/components/flags/ar.svg';
import ja from '@/components/flags/ja.svg';
import ko from '@/components/flags/ko.svg';
import zh from '@/components/flags/zh.svg';
import useCurrency from '@/hooks/useCurrency';
import { CurrencyCode } from '@/lib/common';

type Props = {
    defaultValue?: string;
};

// Define the currency keys type
type CurrencyKey = 'GBP' | 'IDR' | 'SAR' | 'JPY' | 'KRW' | 'RMB';

// Type the currencies object properly
const currencies: Record<CurrencyKey, { value: any; label: string }> = {
    GBP: {
        value: en,
        label: '(GBP) Pound sterling',
    },
    IDR: {
        value: id,
        label: '(IDR) Rupiah',
    },
    SAR: {
        value: ar,
        label: '(SAR) Riyal',
    },
    JPY: {
        value: ja,
        label: '(JPY) Yen',
    },
    KRW: {
        value: ko,
        label: '(KRW) Won',
    },
    RMB: {
        value: zh,
        label: '(RMB) Renminbi',
    },
};

export default function CurrencySelect({ defaultValue }: Readonly<Props>) {
    // Initialize with default 'IDR' - the hook will handle getting from localStorage
    const { changeCurrency, currency } = useCurrency();

    function onSelectChange(currency: string) {
        // Handle currency change logic here
        if (typeof window !== 'undefined') {
            localStorage.setItem('currency', currency);
            window.dispatchEvent(new CustomEvent('currencyChange'));
        }
        changeCurrency(currency as CurrencyCode);
    }

    return (
        <Select
            defaultValue={defaultValue ?? currency}
            onValueChange={onSelectChange}
        >
            <SelectTrigger
                className={'border-none shadow-none font-semibold'}
                chevronDownClassName="opacity-100 "
            >
                <SelectValue placeholder={currency} />
            </SelectTrigger>
            <SelectContent>
                {(Object.keys(currencies) as CurrencyKey[]).map((currency) => (
                    <SelectItem key={currency} value={currency}>
                        <div className="flex items-center gap-2">
                            <Image
                                src={currencies[currency].value}
                                alt={currency}
                                width={16}
                                height={16}
                            />
                            <span>{currencies[currency].label}</span>
                        </div>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
