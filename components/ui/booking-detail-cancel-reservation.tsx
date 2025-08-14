'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronRightIcon } from 'lucide-react';
import Image from 'next/image';
import Logo from '@/app/logo-1.png';
import { LabeledInput } from './input';
import { useFormik } from 'formik';
import { Button } from './button';
import dynamic from 'next/dynamic';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
const ResponsiveDialog = dynamic(
    () => import('@/components/ui/responsive-dialog'),
    { ssr: false }
);

export default function BookingDetailCancelReservation() {
    const [open, setOpen] = useState(false);
    const t = useTranslations('BookingDetail');
    return (
        <ResponsiveDialog
            open={open}
            setOpen={setOpen}
            title="Cancel Reservation"
            description=""
            trigger={
                <button className="px-4 py-2 bg-neutral-50 rounded-sm text-danger-200 font-semibold flex justify-between cursor-pointer">
                    {t('cancelReservation')}{' '}
                    <ChevronRightIcon className="size-6 text-neutral-300" />
                </button>
            }
            desktopChildren={<Content setOpen={setOpen} />}
            mobileChildren={<Content setOpen={setOpen} />}
            onlyCloseFromButton={true}
            data-testid="cancellation-reason-dialog"
        />
    );
}

interface ContentProps {
    setOpen: (open: boolean) => void;
}
function Content(props: Readonly<ContentProps>) {
    const t = useTranslations('BookingDetail');
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const formik = useFormik({
        initialValues: {
            reason: '',
        },
        validateOnMount: true,
        onSubmit: async () => {
            const query = new URLSearchParams(searchParams.toString());
            query.set('status', 'CANCELLED');
            router.push({
                pathname,
                query: Object.fromEntries(query),
            });
            props.setOpen(false);
            toast.success('Order successfully cancelled.', {
                className: '!border !border-success-500',
            });
        },
    });
    return (
        <div className="flex flex-col max-w-[384px] mx-auto py-4">
            <Image
                src={Logo}
                width={65}
                height={48}
                alt="Padma Logo"
                className="aspect-video w-[65px] h-[48px] mb-6 mx-auto"
            />
            <h2 className="h2 mb-2 text-center">{t('cancellationReason')}</h2>
            <p className="text-neutral-500 mb-6 text-center">
                {t('cancellationReasonDesc')}
            </p>
            <form onSubmit={formik.handleSubmit}>
                <LabeledInput
                    id="reason"
                    data-testid="reason"
                    label={<span>{t('cancellationReasonPlaceholder')}</span>}
                    value={formik.values.reason}
                    onChange={formik.handleChange}
                    className="h-11 mb-6"
                    name="reason"
                />
                <Button
                    data-testid="submit-reason-button"
                    disabled={formik.values.reason.trim().length === 0}
                    type="submit"
                    className="h-12 w-full"
                >
                    {t('confirm')}
                </Button>
            </form>
        </div>
    );
}
