'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from '@/components/ui/dialog';
import Image from 'next/image';
import SuccessImage from '@/app/success.png';
import { Button } from '@/components/ui/button';
import { useModalStore } from '@/store/modal';
import { useRouter } from '@/i18n/navigation';

export default function ResetPasswordSuccessDialog() {
    const {
        toggleModalSignIn,
        isResetPasswordSuccessOpen,
        toggleModalResetPasswordSuccess,
    } = useModalStore();
    const router = useRouter();
    const toLogin = () => {
        toggleModalResetPasswordSuccess();
        toggleModalSignIn();
        router.push('/');
    };
    return (
        <Dialog open={isResetPasswordSuccessOpen} onOpenChange={toLogin}>
            <DialogContent
                showCloseButton={true}
                onEscapeKeyDown={(e) => e.preventDefault()}
                onPointerDownOutside={(e) => e.preventDefault()}
                onInteractOutside={(e) => e.preventDefault()}
                className="p-10"
            >
                <DialogTitle className={'hidden'} title="Verify Email Sent" />
                <DialogDescription className={'hidden'}>
                    Reset Password Expired
                </DialogDescription>
                <div className="block text-center max-w-sm w-full mx-auto">
                    <Image
                        src={SuccessImage}
                        alt="Picture of user"
                        width={120}
                        height={120}
                        className={'mx-auto mb-8'}
                    />
                    <h2
                        className={
                            'mb-3 text-neutral-600 text-xl font-semibold'
                        }
                    >
                        Reset Password Success
                    </h2>
                    <p className={'mb-10 text-neutral-500'}>
                        Please login again & enjoy our special promo.
                    </p>
                    <Button className={'w-full h-12'} onClick={toLogin}>
                        Back to Login
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
