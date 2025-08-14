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
import { useCallback, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function VerifyEmailLinkExpiredDialog() {
    const t = useTranslations('Home');
    const searchParams = useSearchParams();
    const router = useRouter();
    const { isModalVerifyEmailExpiredOpen, setModalVerifyEmailExpired } =
        useModalStore();
    useEffect(() => {
        if (
            searchParams.has('expired') &&
            searchParams.has('type') &&
            searchParams.get('type') === 'account-verification'
        ) {
            setModalVerifyEmailExpired(true);
        }
    }, [searchParams]);
    const handleDialogChange = useCallback(
        (open: boolean) => {
            if (!open) {
                router.push('/');
            }
            setModalVerifyEmailExpired(open);
        },
        [setModalVerifyEmailExpired]
    );
    return (
        <Dialog
            open={isModalVerifyEmailExpiredOpen}
            onOpenChange={handleDialogChange}
        >
            <DialogContent showCloseButton={false} className="p-10">
                <DialogTitle
                    className={'hidden'}
                    title={t('verificationExpired')}
                />
                <DialogDescription className={'hidden'}>
                    {t('verificationExpiredDesc')}
                </DialogDescription>

                <div className="block text-center sm:w-full sm:max-w-[512px] mx-auto">
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
                        {t('verificationExpired')}
                    </h2>
                    <p className={'mb-10 text-neutral-500'}>
                        {t('verificationExpiredDesc')}
                    </p>
                    <Button
                        className={'w-full h-12'}
                        onClick={() => {
                            setModalVerifyEmailExpired(false);
                            router.push(`/`);
                        }}
                    >
                        {t('close')}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
