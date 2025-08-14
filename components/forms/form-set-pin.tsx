'use client';

import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp';
import React, { useEffect, useState } from 'react';
import { createPIN, setTokenInCookie } from '@/lib/AuthActions';
import { useModalStore } from '@/store/modal';
import { Alert, AlertTitle } from '@/components/ui/alert';
import WarningCircleIcon from '@/components/icons/warning-circle-icon';
import { useRouter } from '@/i18n/navigation';

interface FormSetPinProps {
    at?: string;
}

export default function FormSetPin(props: Readonly<FormSetPinProps>) {
    const [pin, setPin] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toggleModalSignIn } = useModalStore();
    const [backendError, setBackendError] = useState('');
    const router = useRouter();

    const handlePinChange = (value: string) => {
        setPin(value);
    };

    useEffect(() => {
        if (pin.length === 6) {
            handleSubmit();
        }
    }, [pin]);

    const handleSubmit = async () => {
        if (pin.length !== 6) {
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await createPIN(pin, props.at as string);

            if (response.status !== 200 && response.status !== 201) {
                const errorMessage =
                    response.message?.en ||
                    'Failed to set PIN. Please try again.';
                throw new Error(errorMessage);
            }

            toggleModalSignIn();
            await setTokenInCookie(props.at as string);
            if (typeof window !== 'undefined') {
                const reservationDraftUrl = localStorage.getItem(
                    'reservation-redirect-url'
                );
                if (reservationDraftUrl) {
                    router.push(reservationDraftUrl);
                    localStorage.setItem('reservation-redirect-url', '');
                }
            }
        } catch (error) {
            console.error('Error setting PIN:', error);
            const errorMessage = error as Error;
            setBackendError(errorMessage.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className={'block text-center'}>
            <h2 className="h2 mb-6 py-4">Set up Padma PIN</h2>

            <p className="mb-4 text-neutral-400">
                Avoid using combinations of numbers, birth dates, or phone
                numbers for account security.
            </p>
            <p className="mb-4 text-xs text-neutral-500">Enter your PIN</p>
            <div className="mb-6 flex justify-center">
                <InputOTP
                    maxLength={6}
                    value={pin}
                    onChange={handlePinChange}
                    disabled={isSubmitting}
                >
                    <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                    </InputOTPGroup>
                </InputOTP>
            </div>
            {backendError && (
                <Alert className="text-left text-danger-200 bg-danger-00 mb-6 border-none shadow-sm [&>svg]:size-6 has-[>svg]:grid-cols-[calc(var(--spacing)*6)_1fr]">
                    <WarningCircleIcon className="w-6 h-6 text-2xl" />
                    <AlertTitle className="flex items-end min-h-6 text-sm font-semibold">
                        {backendError}
                    </AlertTitle>
                </Alert>
            )}
            <div className="bg-yellow-00 text-center mb-6 p-4 rounded">
                <p className={'text-yellow-200 text-sm'}>
                    PIN will be used for every transaction, redemption point,
                    and others.
                </p>
            </div>
        </form>
    );
}
