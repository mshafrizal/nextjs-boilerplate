'use client';

import React, { useActionState, useState } from 'react';
import { Message } from '@/lib/common';
import { forgotPassword } from '@/lib/AuthActions';
import Logo from '@/app/logo-1.png';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle } from '@/components/ui/alert';
import WarningCircleIcon from '@/components/icons/warning-circle-icon';
import ForgotPasswordLinkSent from '@/components/ui/forgot-password-link-sent';

export interface ForgotPasswordFormState {
    message: Message;
    status: number | null;
    result: null;
}

const initialState: ForgotPasswordFormState = {
    message: {
        id: '',
        en: '',
    },
    status: null,
    result: null,
};

export interface ForgotPasswordFormProps {
    onClose: () => void;
}

export default function FormForgotPassword({
    onClose,
}: Readonly<ForgotPasswordFormProps>) {
    const [state, formAction, pending] = useActionState(
        forgotPassword,
        initialState
    );
    const [email, setEmail] = useState('');

    const isVerificationSent = state.status === 200;

    return (
        <div className={'max-w-sm mx-auto'}>
            {/* Form Section */}
            {!isVerificationSent && (
                <div className="animate-in fade-in duration-300">
                    <form action={formAction} className="block text-center">
                        <Image
                            src={Logo}
                            alt="Padma Hotel Logo"
                            width={100}
                            className="mb-6 mx-auto"
                        />

                        <h2 className="h2 mb-2 py-4">Forgot Password</h2>

                        <p className="text-neutral-500 mb-6">
                            Please input your active email address, we will send
                            the activation link for reset password.
                        </p>

                        <Input
                            placeholder="Email address"
                            name="email"
                            type="email"
                            id="email"
                            data-testid="forgot-password-email-input"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={'mb-6'}
                        />

                        {state.status && state.status >= 400 && (
                            <Alert
                                className={
                                    'text-danger-200 bg-danger-00 border-none shadow-sm mb-6'
                                }
                                data-testid="forgot-password-alert"
                            >
                                <WarningCircleIcon />
                                <AlertTitle
                                    className={
                                        'text-left font-normal text-danger-200 line-clamp-none'
                                    }
                                >
                                    {state.message.en}
                                </AlertTitle>
                            </Alert>
                        )}

                        <Button
                            disabled={email.length === 0 || pending}
                            className={'w-full h-12'}
                            data-testid="forgot-password-submit"
                        >
                            Send Link
                        </Button>
                    </form>
                </div>
            )}

            {/* Verification Sent Section */}
            {isVerificationSent && <ForgotPasswordLinkSent onClose={onClose} />}
        </div>
    );
}
