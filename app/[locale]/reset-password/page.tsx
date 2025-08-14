'use server';
import React from 'react';
import FormResetPassword from '@/components/forms/form-reset-password';
import ResetPasswordSuccessDialog from '@/components/ui/reset-password-success-dialog';
import { verifyEmailToken } from '@/lib/AuthActions';

export default async function ResetPasswordPage({
    searchParams,
}: Readonly<{
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}>) {
    const token = (await searchParams).token;
    const type = (await searchParams).type;
    if (token && type) {
        await verifyEmailToken({
            token: token as string,
            type: type as string,
        });
    }
    return (
        <main
            className={'container mx-auto pt-10 min-h-[calc(100vh - 80px)]}>'}
        >
            <FormResetPassword token={token} />
            <ResetPasswordSuccessDialog />
        </main>
    );
}
