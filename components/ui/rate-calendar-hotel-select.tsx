'use client';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from '@/components/ui/select';
import HotelIcon from '@/components/icons/hotel-icon';
import { useEffect, useMemo, useState } from 'react';
import { APIResponse, PaginatedResponse, Property } from '@/lib/common';
import { cn, commonHeaders } from '@/lib/utils';
import { LoaderCircle } from 'lucide-react';
import { useSelectOptionsStore } from '@/store/select-options';

interface RateCalendarHotelSelect {
    value: string;
    setValue: (value: string) => void;
    className?: string;
}

export default function RateCalendarHotelSelect(
    props: Readonly<RateCalendarHotelSelect>
) {
    const { hotelOptions, setHotelOptions } = useSelectOptionsStore();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchProperties = async () => {
            setLoading(true);
            const s = ['ACTIVE'];
            const searchParams = new URLSearchParams();
            searchParams.append('limit', '50');
            s.forEach((status) => {
                searchParams.append('statuses[]', status);
            });
            const api = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/v1/app/hotel-properties?${searchParams.toString()}`,
                {
                    headers: commonHeaders,
                }
            );
            if (!api.ok) await Promise.reject(new Error(api.statusText));
            const json = (await api.json()) as APIResponse<
                PaginatedResponse<Property>
            >;
            setHotelOptions(json.response_output.list.content);
        };
        if (!hotelOptions.length)
            fetchProperties()
                .catch((e) => console.log('Failed to fetch properties.', e))
                .finally(() => setLoading(false));
    }, []);
    const valueObject = useMemo(() => {
        if (props.value && !loading) {
            return hotelOptions.find((property) => property.id === props.value);
        }
        return undefined;
    }, [props.value, loading]);
    if (loading) return <LoaderCircle className="mx-auto animate-spin" />;
    return (
        <Select
            value={props.value}
            onValueChange={props.setValue}
            data-testid="property-select"
        >
            <SelectTrigger
                className={cn(
                    'border border-neutral-200 py-2 h-max! mx-auto 2xl:w-3/4',
                    props.className
                )}
                data-testid="property-select-trigger"
            >
                <HotelIcon className="fill-white text-brand-01" />
                <div className="flex flex-col gap-1 text-left">
                    <span className="text-neutral-500 text-sm font-medium">
                        Hotel
                    </span>
                    {valueObject && (
                        <span className="text-neutral-500 font-semibold">
                            {valueObject.property_name}
                        </span>
                    )}
                    {!props.value && (
                        <span className="text-neutral-300">
                            Please select hotel
                        </span>
                    )}
                </div>
            </SelectTrigger>
            <SelectContent data-testid="property-select-content">
                {hotelOptions.map((property) => (
                    <SelectItem
                        value={property.id}
                        key={property.id}
                        data-testid="property-option"
                    >
                        {property.property_name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
