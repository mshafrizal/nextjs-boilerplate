'use server';

import { APIResponse, Country, DetailResponse } from '@/lib/common';
import { cn, commonHeaders } from '@/lib/utils';
import { HTMLAttributes } from 'react';

interface CountryLabelProps extends HTMLAttributes<HTMLParagraphElement> {
    id?: string;
    returnKey: keyof Omit<Country, 'id'>;
    className?: string;
    ['data-testid']?: string;
}

export default async function CountryLabel(props: Readonly<CountryLabelProps>) {
    if (!props.id) return null;
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/v1/app/country/${props.id}`;
    const countryApi = await fetch(apiUrl, {
        headers: commonHeaders,
    });
    if (!countryApi.ok) return null;
    const countryJson = (await countryApi.json()) as APIResponse<
        DetailResponse<Country>
    >;
    if (!countryJson.response_output.detail) return null;
    const country = countryJson.response_output?.detail;
    return (
        <p
            data-testid={props['data-testid']}
            className={cn(
                'text-right text-neutral-500 font-semibold',
                props.className
            )}
        >
            {country[props.returnKey]}
        </p>
    );
}
