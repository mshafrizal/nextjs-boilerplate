'use client';
import { InfiniteSelect } from '@/components/ui/infinite-select';
import { APIResponse, Country, PaginatedResponse } from '@/lib/common';
import { commonHeaders } from '@/lib/utils';

interface PropertySelectProps {
    value: string;
    onChange: (value: string) => void;
}

export default function PhoneCodeSelect(props: Readonly<PropertySelectProps>) {
    const fetchCountries = async (page: number, search?: string) => {
        const searchParams = new URLSearchParams();
        searchParams.append('page', page.toString());
        searchParams.append('limit', '500');
        if (search) searchParams.append('search', search);
        const api = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/v1/app/country?${searchParams.toString()}`,
            {
                headers: commonHeaders,
            }
        );
        if (!api.ok) await Promise.reject(new Error(api.statusText));
        const json = (await api.json()) as APIResponse<
            PaginatedResponse<Country>
        >;
        return {
            data: json.response_output.list.content,
            hasNextPage:
                json.response_output.list.pagination.size ===
                json.response_output.list.pagination.rows_per_page,
            hasPreviousPage: json.response_output.list.pagination.page > 1,
            total: json.response_output.list.pagination.total,
        };
    };
    const transformData = (item: unknown) => {
        const country = item as Country;
        return {
            value: country.id,
            label: `+${country.country_dial_code}`,
            itemLabel: `+${country.country_dial_code} ${country.country_name}`,
        };
    };
    return (
        <InfiniteSelect
            fetchData={fetchCountries}
            transformData={transformData}
            className={'w-full'}
            value={props.value}
            onValueChange={props.onChange}
            searchable={true}
            placeholder={'Code'}
            searchPlaceholder={'Ex: Indonesia'}
            testId="phone-code-select"
        />
    );
}
