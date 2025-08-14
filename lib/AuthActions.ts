'use server';

import {
    APIResponse,
    DetailResponse,
    ErrorResponse,
    SetPinResponse,
} from '@/lib/common';
import { cookies } from 'next/headers';
import { redirect } from '@/i18n/navigation';
import { getLocale } from 'next-intl/server';
import { revalidatePath } from 'next/cache';

export async function signOut() {
    const locale = await getLocale();
    const cookieStore = await cookies();
    const at = cookieStore.get('at');
    const url = `${process.env.NEXT_PUBLIC_API_URL}/v1/app/membership/logout`;
    await fetch(url, {
        method: 'POST',
        headers: {
            authorization: `Bearer ${at?.value}`,
        },
    });
    cookieStore.delete('at');
    revalidatePath('/');
    redirect({
        href: '/',
        locale: locale,
    });
}

export async function createPIN(pin: string, token: string) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/v1/app/membership/create-pin`;
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ pin }),
    });

    if (!res.ok) {
        const errRes =
            (await res.json()) as unknown as APIResponse<ErrorResponse>;
        return {
            message: errRes.response_schema.response_message,
            code: errRes.response_schema.response_code,
            status: res.status,
            result: null,
        };
    }

    const successRes = (await res.json()) as APIResponse<
        DetailResponse<SetPinResponse>
    >;
    return {
        message: successRes.response_schema.response_message,
        status: res.status,
        result: successRes.response_output.detail,
    };
}

export async function forgotPassword(_: any, formData: FormData) {
    const email = formData.get('email');
    const url = `${process.env.NEXT_PUBLIC_API_URL}/v1/app/membership/request-reset-password`;
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'app-token': `${process.env.NEXT_PUBLIC_APP_TOKEN}`,
        },
        body: JSON.stringify({
            email: email?.toString() ?? '',
        }),
    });

    if (!res.ok) {
        const errRes =
            (await res.json()) as unknown as APIResponse<ErrorResponse>;
        return {
            message: errRes.response_schema.response_message,
            status: res.status,
            result: null,
        };
    }

    const successRes = (await res.json()) as APIResponse<DetailResponse<null>>;
    return {
        message: successRes.response_schema.response_message,
        status: res.status,
        result: successRes.response_output.detail,
    };
}

export async function setTokenInCookie(at: string) {
    if (at) {
        const cookieStore = await cookies();
        cookieStore.set({
            name: 'at',
            value: at,
            httpOnly: true,
            path: '/',
        });
    }
}
export type VerifyEmailTokenParams = {
    token: string;
    type: string;
};
export async function verifyEmailToken({
    token,
    type,
}: VerifyEmailTokenParams) {
    const locale = await getLocale();
    let url = ``;

    if (type === 'forgot-password') {
        url = `${process.env.NEXT_PUBLIC_API_URL}/v1/app/membership/verify-email-token/${token}/${type}`;
    } else if (type === 'account-verification') {
        url = `${process.env.NEXT_PUBLIC_API_URL}/v1/app/membership/email/verify/${token}`;
    } else {
        redirect({
            href: `/`,
            locale,
        });
    }

    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!res.ok) {
        redirect({
            href: `/?expired=true&type=${type}`,
            locale,
        });
    }
    if (type === 'forgot-password') {
        redirect({
            href: `/reset-password?token=${token}`,
            locale,
        });
    } else if (type === 'account-verification') {
        redirect({
            href: `/account-verified?token=${token}`,
            locale,
        });
    }
}
