'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import bca from '@/app/bca.png';
import mastercard from '@/app/mastercard.png';
import jcb from '@/app/jcb.png';
import visa from '@/app/visa.png';
import amex from '@/app/amex.png';
import { RadioGroup, RadioGroupItem } from './radio-group';
import { Label } from './label';
import { useState } from 'react';
import { Button } from './button';
import { useTranslations } from 'next-intl';
import { useFormik } from 'formik';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/navigation';
import { toast } from 'sonner';

const ResponsiveDialog = dynamic(
    () => import('@/components/ui/responsive-dialog'),
    { ssr: false }
);
export default function BookingDetailSwitchPayment() {
    const [open, setOpen] = useState(false);
    const t = useTranslations('BookingDetail');
    return (
        <ResponsiveDialog
            open={open}
            setOpen={setOpen}
            title="Switch Payment"
            description=""
            trigger={
                <Button className="h-12 mt-3" variant="ghost">
                    {t('switchPayment')}
                </Button>
            }
            desktopChildren={<Content setOpen={setOpen} />}
            mobileChildren={<Content setOpen={setOpen} />}
            data-testid="switch-payment-dialog"
            showCloseButton={false}
        />
    );
}

interface ContentProps {
    setOpen: (open: boolean) => void;
}
function Content(props: Readonly<ContentProps>) {
    const t = useTranslations('BookingDetail');
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const paymentMethodParams = searchParams.get('paymentMethod');
    const formik = useFormik({
        initialValues: {
            payment: paymentMethodParams,
        },
        validateOnMount: true,
        onSubmit: async (values) => {
            const query = new URLSearchParams(searchParams.toString());
            query.set('paymentMethod', values.payment as string);
            router.replace({
                pathname,
                query: Object.fromEntries(query),
            });
            props.setOpen(false);
            toast.success('Switch Payment Success', {
                className: '!border !border-success-500',
            });
        },
    });
    return (
        <form
            data-testid="switch-payment"
            onSubmit={formik.handleSubmit}
            className="my-4 lg:my-0"
        >
            <h2 className="text-neutral-600 font-semibold text-lg mb-4">
                {t('switchPayment')}
            </h2>

            <div className="flex flex-col gap-5 mb-4">
                <RadioGroup
                    id={'payment-method-radio'}
                    data-testid={'payment-method-radio'}
                    value={formik.values.payment}
                    name="payment"
                >
                    <div
                        className="flex items-center space-x-2 w-full rounded-sm border border-neutral-200 px-4 py-3"
                        key={'va'}
                    >
                        <RadioGroupItem
                            value={'va'}
                            id={`va-radio-option`}
                            disabled={paymentMethodParams === 'va'}
                            onClick={(e) => {
                                console.log('button clicked', e);
                                if (paymentMethodParams === 'card') {
                                    formik.setFieldValue('payment', 'va');
                                    formik.setFieldTouched('payment', true);
                                }
                            }}
                        />
                        <Label
                            htmlFor={`va-radio-option`}
                            className="flex justify-between w-full text-base text-neutral-500"
                        >
                            <span>Virtual Account</span>
                            <Image
                                src={bca}
                                alt={'BCA'}
                                height={24}
                                width={24}
                            />
                        </Label>
                    </div>
                    <div
                        className="flex items-center space-x-2 w-full rounded-sm border border-neutral-200 px-4 py-3"
                        key={'card'}
                        onClick={() => {
                            if (paymentMethodParams === 'va') {
                                formik.setFieldValue('payment', 'card');
                                formik.setFieldTouched('payment', true);
                            }
                        }}
                    >
                        <RadioGroupItem
                            value={'card'}
                            id={`card-radio-option`}
                            disabled={paymentMethodParams === 'card'}
                        />
                        <Label
                            htmlFor={`card-radio-option`}
                            className="flex justify-between w-full text-base text-neutral-500"
                        >
                            <span>Credit/Debit Card</span>
                            <div className="flex gap-2 items-center">
                                <Image
                                    src={mastercard}
                                    alt={'Mastercard'}
                                    height={24}
                                    width={24}
                                />
                                <Image
                                    src={visa}
                                    alt={'Visa'}
                                    height={8}
                                    width={29}
                                />
                                <Image
                                    src={jcb}
                                    alt={'JCB'}
                                    height={20}
                                    width={24}
                                />
                                <Image
                                    src={amex}
                                    alt={'Amex'}
                                    height={24}
                                    width={29}
                                />
                            </div>
                        </Label>
                    </div>
                </RadioGroup>
            </div>
            <div className="flex flex-col gap-3">
                <Button
                    disabled={formik.values.payment === paymentMethodParams}
                    className="h-12"
                    type="submit"
                >
                    {t('continue')}
                </Button>
                <Button
                    className="h-12"
                    variant="outline"
                    onClick={() => props.setOpen(false)}
                    type="button"
                >
                    {t('close')}
                </Button>
            </div>
        </form>
    );
}
