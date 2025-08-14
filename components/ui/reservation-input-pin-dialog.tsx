'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from '@/components/ui/dialog';
import { useTranslations } from 'next-intl';
import { useModalStore } from '@/store/modal';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/components/ui/input-otp';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export default function ReservationInputPinDialog() {
    const t = useTranslations('Reservation');
    const {
        isModalInputPinOpen,
        toggleModalInputPin,
        toggleModalRoomUnavailable,
    } = useModalStore();
    const [pin, setPin] = useState('');
    useEffect(() => {
        if (pin.length === 6) {
            toggleModalInputPin();
            toggleModalRoomUnavailable();
        }
    }, [pin]);

    function onForgotPINClick() {
        alert('Feature on development');
    }

    return (
        <Dialog open={isModalInputPinOpen} onOpenChange={toggleModalInputPin}>
            <DialogContent
                onEscapeKeyDown={(e) => e.preventDefault()}
                onPointerDownOutside={(e) => e.preventDefault()}
                onInteractOutside={(e) => e.preventDefault()}
                className="py-10"
            >
                <VisuallyHidden>
                    <DialogTitle>{t('inputYourPadmaPIN')}</DialogTitle>
                    <DialogDescription>
                        {t('inputYourPadmaPINDesc')}
                    </DialogDescription>
                </VisuallyHidden>
                <div className="container mx-auto sm:max-w-[328px] flex flex-col items-center">
                    <h2 className="h2 mb-10">{t('inputYourPadmaPIN')}</h2>
                    <p className="mb-9 text-neutral-400 text-center max-w-[275px]">
                        {t('inputYourPadmaPINDesc')}
                    </p>
                    <p className="text-sm text-neutral-500 text-center mb-3">
                        {t('enterYourPIN')}
                    </p>
                    <InputOTP maxLength={6} value={pin} onChange={setPin}>
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                    <Button
                        variant="ghost"
                        className="mt-10"
                        onClick={onForgotPINClick}
                    >
                        {t('forgotPIN')}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
