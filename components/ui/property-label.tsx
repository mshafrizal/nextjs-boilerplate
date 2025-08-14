'use server';

import { APIResponse, Property, DetailResponse } from '@/lib/common';
import { cn, commonHeaders } from '@/lib/utils';
import { HTMLAttributes } from 'react';
import { getTranslations } from 'next-intl/server';

interface PropertyLabelProps extends HTMLAttributes<HTMLParagraphElement> {
    id?: string;
    returnKey: keyof Pick<
        Property,
        | 'property_name'
        | 'property_description_en'
        | 'property_description_id'
        | 'property_address'
        | 'property_email'
        | 'property_phone'
    >;
    className?: string;
    ['data-testid']?: string;
    fallbackText?: string;
}

async function fetchPropertyData(id: string): Promise<Property | null> {
    try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/v1/app/hotel-properties/${id}`;

        const response = await fetch(apiUrl, {
            headers: commonHeaders,
            next: { revalidate: 300 }, // Cache for 5 minutes
        });

        if (!response.ok) {
            return null;
        }

        const data = (await response.json()) as APIResponse<
            DetailResponse<Property>
        >;

        if (!data?.response_output?.detail) {
            return null;
        }

        return data.response_output.detail;
    } catch (error) {
        return null;
    }
}

export default async function PropertyLabel({
    id,
    returnKey,
    className,
    fallbackText,
    'data-testid': testId,
    ...props
}: Readonly<PropertyLabelProps>) {
    const t = await getTranslations('Profile');
    const defaultFallback = fallbackText || t('none');

    if (!id) {
        return (
            <p
                className={cn(
                    'text-right text-neutral-500 font-semibold',
                    className
                )}
                data-testid={testId}
                {...props}
            >
                {defaultFallback}
            </p>
        );
    }

    const property = await fetchPropertyData(id);

    if (!property) {
        return (
            <p
                className={cn(
                    'text-right text-neutral-500 font-semibold',
                    className
                )}
                data-testid={testId}
                {...props}
            >
                {defaultFallback}
            </p>
        );
    }

    const propertyValue = property[returnKey];

    if (
        !propertyValue ||
        (typeof propertyValue === 'string' && propertyValue.trim() === '')
    ) {
        return (
            <p
                className={cn(
                    'text-right text-neutral-500 font-semibold',
                    className
                )}
                data-testid={testId}
                {...props}
            >
                {defaultFallback}
            </p>
        );
    }

    return (
        <p
            data-testid={testId}
            className={cn(
                'text-right text-neutral-500 font-semibold',
                className
            )}
            {...props}
        >
            {propertyValue}
        </p>
    );
}
