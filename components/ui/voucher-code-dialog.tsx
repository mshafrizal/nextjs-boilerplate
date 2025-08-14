'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { useTranslations } from 'next-intl';
import Logo from '@/app/logo-1.png';
import { LabeledInput } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useFormik } from 'formik';
import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';

export default function VoucherCodeDialog() {
    const [open, setOpen] = useState(false);
    const t = useTranslations('Home');
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const formik = useFormik({
        initialValues: {
            voucherCode: '',
        },
        isInitialValid: false,
        onSubmit: (values) => {
            const query = new URLSearchParams(searchParams.toString());
            query.set('voucher_code', values.voucherCode);
            router.push({
                pathname: '/search',
                query: Object.fromEntries(query),
            });
            setOpen(false);
        },
    });
    const triggerClassname = useMemo(() => {
        if (pathname.includes('profile') || pathname.includes('search'))
            return 'font-semibold text-neutral-600 cursor-pointer';
        return 'font-semibold text-white cursor-pointer';
    }, [pathname]);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className={triggerClassname}>
                {t('voucherDialogTitle')}
            </DialogTrigger>
            <DialogContent
                className="p-10 md:max-w-[640px]"
                onEscapeKeyDown={(e) => e.preventDefault()}
                onPointerDownOutside={(e) => e.preventDefault()}
                onInteractOutside={(e) => e.preventDefault()}
            >
                <VisuallyHidden>
                    <DialogTitle>{t('voucherDialogTitle')}</DialogTitle>
                    <DialogDescription>
                        {t('voucherDialogDesc')}
                    </DialogDescription>
                </VisuallyHidden>
                <div className="w-full max-w-[384px] mx-auto flex flex-col">
                    <Image
                        src={Logo}
                        alt={'Logo'}
                        width={48}
                        height={65}
                        className="mx-auto w-[65px] h-[48px]"
                    />
                    <h2 className="h2 mt-6 mb-2 text-center">
                        {t('voucherDialogTitle')}
                    </h2>
                    <p className="text-neutral-500 text-center mb-6">
                        {t('voucherDialogDesc')}
                    </p>
                    <form onSubmit={formik.handleSubmit}>
                        <LabeledInput
                            label={<span>{t('inputVoucherCode')}</span>}
                            className="h-12 mb-6 w-full"
                            name="voucherCode"
                            value={formik.values.voucherCode}
                            onChange={formik.handleChange}
                            type="text"
                            id="voucher-code"
                            data-testid="voucher-code"
                        />
                        <Button
                            disabled={!formik.isValid}
                            type="submit"
                            className="h-12 w-full"
                        >
                            {t('applyVoucher')}
                        </Button>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
