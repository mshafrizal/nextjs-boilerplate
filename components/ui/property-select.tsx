'use client';
import { InfiniteSelect } from '@/components/ui/infinite-select';
import { APIResponse, PaginatedResponse, Property } from '@/lib/common';
import { commonHeaders } from '@/lib/utils';

interface PropertySelectProps {
    value: string;
    onChange: (value: string) => void;
}

export default function PropertySelect(props: Readonly<PropertySelectProps>) {
    const fetchProperties = async (page: number) => {
        const statuses = ['ACTIVE'];
        const searchParams = new URLSearchParams();
        searchParams.append('page', page.toString());
        searchParams.append('limit', '20');
        statuses.forEach((status) => {
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
        const data = [];
        data.push({ id: 'none', property_name: 'This is my first stay' });
        json.response_output.list.content.forEach((c) => {
            data.push({ id: c.id, property_name: c.property_name });
        });

        return {
            data: data,
            hasNextPage:
                json.response_output.list.pagination.size ===
                json.response_output.list.pagination.rows_per_page,
            hasPreviousPage: json.response_output.list.pagination.page > 1,
            total: json.response_output.list.pagination.total,
        };
    };
    const transformData = (item: unknown) => {
        const property = item as Property;
        return {
            value: property.id,
            label: property.property_name,
        };
    };
    return (
        <InfiniteSelect
            fetchData={fetchProperties}
            transformData={transformData}
            className={'w-full'}
            value={props.value}
            onValueChange={props.onChange}
            placeholder={'Last visit'}
            testId="property-select"
            required={true}
        />
    );
}
