'use server';

import { getLocale } from 'next-intl/server';
import {
    APIResponse,
    DetailResponse,
    ErrorResponse,
    SettingContent,
} from '@/lib/common';
import { commonHeaders } from '@/lib/utils';

export async function getContent(type: string) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/v1/app/settings/${type}`;
    const locale = await getLocale();
    const res = await fetch(url, {
        method: 'GET',
        headers: commonHeaders,
    });

    if (!res.ok) {
        const errRes = (await res.json()) as APIResponse<ErrorResponse>;
        return {
            message: errRes.response_schema.response_message,
            status: res.status,
            result: null,
        };
    }

    const successRes = (await res.json()) as APIResponse<
        DetailResponse<SettingContent>
    >;

    const content =
        locale === 'id'
            ? successRes.response_output.detail.content_id
            : successRes.response_output.detail.content_en;
    return {
        message: successRes.response_schema.response_message,
        status: res.status,
        result: content,
    };
}
