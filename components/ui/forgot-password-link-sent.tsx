'use client';

import { ForgotPasswordFormProps } from '@/components/forms/form-forgot-password';
import Image from 'next/image';
import Logo from '@/app/logo-1.png';
import EmailImage from '@/app/email.png';
import { Button } from '@/components/ui/button';
import React from 'react';

export default function ForgotPasswordLinkSent({
    onClose,
}: Readonly<ForgotPasswordFormProps>) {
    return (
        <div
            id="verification-sent"
            data-testid="verification-sent-message"
            className="block text-center sm:w-full sm:max-w-sm"
        >
            <Image
                src={Logo}
                alt="Padma Hotel Logo"
                width={65}
                height={48}
                className="mb-6 mx-auto"
            />

            <Image
                src={EmailImage}
                alt="Picture of the email"
                width={120}
                height={120}
                className={'mx-auto mb-8'}
            />

            <h2 className="mb-3 text-neutral-600 text-xl font-semibold">
                Verification Email Sent
            </h2>

            <p className="mb-10 text-neutral-500">
                Please check your verification email and reset your password.
            </p>

            <Button className="w-full h-12" onClick={onClose}>
                Close
            </Button>
        </div>
    );
}
