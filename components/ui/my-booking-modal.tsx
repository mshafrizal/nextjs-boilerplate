'use client';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import PadmaLogo from '@/components/ui/padma-logo';
import { useTranslations } from 'next-intl';
import { LabeledInput } from '@/components/ui/input';
import { useFormik } from 'formik';
import { useModalStore } from '@/store/modal';
import { Button } from './button';
type MyBookingInitialValue = {
    email: string;
    booking_number: string;
};
const initialValues: MyBookingInitialValue = {
    email: '',
    booking_number: '',
};
export default function MyBookingModal() {
    const t = useTranslations('Home');
    const { isModalMyBookingOpen, toggleModalMyBooking } = useModalStore();

    const formik = useFormik<MyBookingInitialValue>({
        initialValues,
        validateOnMount: true,
        isInitialValid: false,
        onSubmit: (values: MyBookingInitialValue) => {
            console.log(values);
        },
    });
    const onClose = () => {
        formik.resetForm();
        toggleModalMyBooking();
    };
    return (
        <Dialog
            open={isModalMyBookingOpen}
            onOpenChange={() => toggleModalMyBooking()}
        >
            <DialogContent
                onEscapeKeyDown={(e) => e.preventDefault()}
                onPointerDownOutside={(e) => e.preventDefault()}
                onInteractOutside={(e) => e.preventDefault()}
            >
                <VisuallyHidden>
                    <DialogHeader>
                        <DialogTitle>My Booking</DialogTitle>
                    </DialogHeader>
                </VisuallyHidden>
                <div
                    className={
                        'flex flex-col text-center gap-4 sm:gap-6 sm:max-w-[420px] mx-auto'
                    }
                >
                    <div className="flex justify-center">
                        <PadmaLogo />
                    </div>
                    <h2 className="h2">{t('myBooking')}</h2>
                    <p className="text-neutral-500">{t('myBookingDesc')}</p>
                    <div className="block">
                        <LabeledInput
                            value={formik.values.booking_number}
                            onChange={formik.handleChange}
                            name="booking_number"
                            id="booking_number"
                            label={t('bookingConfirmationNumber')}
                            data-testid="booking_number"
                            className={'h-12'}
                        />
                    </div>
                    <div className="block">
                        <LabeledInput
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            name="email"
                            id="email"
                            label={t('emailAddress')}
                            data-testid="email"
                            className={'h-12'}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <Button
                            className="h-12 grow"
                            onClick={onClose}
                            disabled={!formik.isValid}
                        >
                            {t('cancel')}
                        </Button>
                        <Button
                            className="h-12 grow"
                            onClick={onClose}
                            disabled={!formik.isValid}
                        >
                            {t('retrieveBooking')}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
