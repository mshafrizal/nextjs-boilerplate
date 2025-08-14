'use client';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from '@/components/ui/dialog';
import { useModalStore } from '@/store/modal';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import EmailImage from '@/app/email.png';
import Image from 'next/image';

export default function RegisterSuccessDialog() {
    const { isModalVerifyEmailSentOpen, toggleIsModalVerifyEmailSent } =
        useModalStore();
    const t = useTranslations('Auth.SignUp');
    return (
        <Dialog
            open={isModalVerifyEmailSentOpen}
            onOpenChange={toggleIsModalVerifyEmailSent}
        >
            <DialogContent showCloseButton={false} className="py-10">
                <DialogTitle className={'hidden'} title="Verify Email Sent" />
                <DialogDescription className={'hidden'}>
                    Check your email
                </DialogDescription>
                <div className="block text-center sm:w-full sm:max-w-[512px] mx-auto">
                    <Image
                        src={EmailImage}
                        alt="Picture of the email"
                        width={120}
                        height={120}
                        className={'mx-auto mb-8'}
                    />
                    <h2
                        className={
                            'mb-3 text-neutral-600 text-xl font-semibold'
                        }
                    >
                        {t('verifyEmailSent')}
                    </h2>
                    <p className={'mb-10 text-neutral-500'}>
                        {t('verifyEmailSentDesc')}
                    </p>
                    <Button
                        className={'w-full h-12'}
                        onClick={() => toggleIsModalVerifyEmailSent()}
                    >
                        {t('close')}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
