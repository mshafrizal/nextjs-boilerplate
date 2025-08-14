'use server';

import { APIResponse, DetailResponse, Province } from '@/lib/common';
import { cn, commonHeaders } from '@/lib/utils';
import { HTMLAttributes } from 'react';

interface ProvinceLabelProps extends HTMLAttributes<HTMLParagraphElement> {
    id?: string;
    returnKey: keyof Omit<Province, 'id' | 'country'>;
    className?: string;
    ['data-testid']?: string;
}

export default async function ProvinceLabel(
    props: Readonly<ProvinceLabelProps>
) {
    if (!props.id) return null;
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/v1/app/province/${props.id}`;
    const provinceApi = await fetch(apiUrl, {
        headers: commonHeaders,
    });
    if (!provinceApi.ok) return null;
    const provinceJson = (await provinceApi.json()) as APIResponse<
        DetailResponse<Province>
    >;
    if (!provinceJson.response_output.detail) return null;
    const province = provinceJson.response_output?.detail;
    return (
        <p
            data-testid={props['data-testid']}
            className={cn(
                'text-right text-neutral-500 font-semibold',
                props.className
            )}
        >
            {province[props.returnKey]}
        </p>
    );
}
