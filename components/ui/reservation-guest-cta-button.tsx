'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { useTranslations } from 'next-intl';
import FormSignIn from '@/components/forms/form-signin';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

export default function ReservationGuestCTAButton() {
    const t = useTranslations('Reservation');
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="font-semibold text-brand-01 cursor-pointer">
                    {t('loginOrSignUp')}
                </button>
            </DialogTrigger>
            <DialogContent>
                <VisuallyHidden>
                    <DialogTitle>Sign In</DialogTitle>
                    <DialogDescription>Sign In</DialogDescription>
                </VisuallyHidden>
                <FormSignIn />
            </DialogContent>
        </Dialog>
    );
}
