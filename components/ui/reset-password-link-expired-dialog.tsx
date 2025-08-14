'use client';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from '@/components/ui/dialog';
import { useModalStore } from '@/store/modal';
import { Button } from '@/components/ui/button';
import FailedImage from '@/app/failed.png';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import FormForgotPassword from '@/components/forms/form-forgot-password';
import { useSearchParams } from 'next/navigation';
import { useRouter } from '@/i18n/navigation';

export default function ResetPasswordLinkExpiredDialog() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { isResetPasswordExpiredOpen, setModalResetPasswordExpired } =
        useModalStore();
    const [isShowForm, setIsShowForm] = useState(false);
    useEffect(() => {
        if (
            searchParams.has('expired') &&
            searchParams.has('type') &&
            searchParams.get('type') === 'forgot-password'
        ) {
            setModalResetPasswordExpired(true);
        }
    }, [searchParams]);
    const handleDialogChange = useCallback(
        (open: boolean) => {
            if (!open) {
                router.push('/');
            }
            setModalResetPasswordExpired(open);
        },
        [setModalResetPasswordExpired]
    );
    return (
        <Dialog
            open={isResetPasswordExpiredOpen}
            onOpenChange={handleDialogChange}
        >
            <DialogContent showCloseButton={false}>
                <DialogTitle className={'hidden'} title="Verify Email Sent" />
                <DialogDescription className={'hidden'}>
                    Reset Password Expired
                </DialogDescription>

                {isShowForm ? (
                    <FormForgotPassword
                        onClose={() => {
                            setModalResetPasswordExpired(false);
                            router.push('/');
                        }}
                    />
                ) : (
                    <div className="block text-center">
                        <Image
                            src={FailedImage}
                            alt="Picture of the failure"
                            width={120}
                            height={120}
                            className={'mx-auto mb-8'}
                        />
                        <h2
                            className={
                                'mb-3 text-neutral-600 text-xl font-semibold'
                            }
                        >
                            Reset Password Expired
                        </h2>
                        <p className={'mb-10 text-neutral-500'}>
                            Click the button below to reset the password.
                        </p>
                        <Button
                            className={'w-full'}
                            onClick={() => setIsShowForm(true)}
                        >
                            Back to Forget Password
                        </Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
