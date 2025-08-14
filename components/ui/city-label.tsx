'use server';

import { APIResponse, DetailResponse, City } from '@/lib/common';
import { cn, commonHeaders } from '@/lib/utils';
import { HTMLAttributes } from 'react';

interface CityLabelProps extends HTMLAttributes<HTMLParagraphElement> {
    id?: string;
    returnKey: keyof Omit<City, 'id' | 'province'>;
    className?: string;
    ['data-testid']?: string;
}

export default async function CityLabel(props: Readonly<CityLabelProps>) {
    if (!props.id) return null;
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/v1/app/city/${props.id}`;
    const cityApi = await fetch(apiUrl, {
        headers: commonHeaders,
    });
    if (!cityApi.ok) return null;
    const cityJson = (await cityApi.json()) as APIResponse<
        DetailResponse<City>
    >;
    if (!cityJson.response_output.detail) return null;
    const city = cityJson.response_output?.detail;
    return (
        <p
            data-testid={props['data-testid']}
            className={cn(
                'text-right text-neutral-500 font-semibold',
                props.className
            )}
        >
            {city[props.returnKey]}
        </p>
    );
}
