'use server';

import {
    APIResponse,
    City,
    Country,
    DetailResponse,
    ErrorResponse,
    Province,
    ResponseMessage,
} from '@/lib/common';
import { commonHeaders } from '@/lib/utils';

type MasterDataResponse<T> = {
    message: ResponseMessage | string;
    status: number;
    result: T | null;
};

async function fetchMasterData<T>(
    endpoint: string
): Promise<MasterDataResponse<T>> {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/v1/app/${endpoint}`;
    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: commonHeaders,
            // Add Next.js fetch options for better caching and revalidation
            cache: 'no-store', // Or 'force-cache' if you want to cache
            next: {
                tags: [`master-data-${endpoint}`], // For targeted revalidation
                revalidate: 3600, // Revalidate every hour
            },
        });

        if (!res.ok) {
            const errRes = (await res.json()) as APIResponse<ErrorResponse>;
            return {
                message: errRes.response_schema.response_message,
                status: res.status,
                result: null,
            };
        }

        const successRes = (await res.json()) as APIResponse<DetailResponse<T>>;

        return {
            message: successRes.response_schema.response_message,
            status: res.status,
            result: successRes.response_output.detail,
        };
    } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
        return {
            message:
                error instanceof Error
                    ? error.message
                    : 'Unknown error occurred',
            status: 500,
            result: null,
        };
    }
}

export async function getCountryDetail(
    id: string
): Promise<MasterDataResponse<Country>> {
    return fetchMasterData<Country>(`country/${id}`);
}

export async function getProvinceDetail(
    id: string
): Promise<MasterDataResponse<Province>> {
    return fetchMasterData<Province>(`province/${id}`);
}

export async function getCityDetail(
    id: string
): Promise<MasterDataResponse<City>> {
    return fetchMasterData<City>(`city/${id}`);
}
