import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';
import { signOut } from '@/lib/AuthActions';
import { SignInDataResponse } from '@/lib/common';
import { getTranslations } from 'next-intl/server';
import BookingDetailRoom from '@/components/ui/booking-detail-room';
import BookingDetailPreference from '@/components/ui/booking-detail-preference';
import BookingDetailPaidPaymentSummary from '@/components/ui/booking-detail-paid-payment-summary';
import BookingDetailUnpaidPaymentSummary from '@/components/ui/booking-detail-unpaid-payment-summary';
import { BookingStatus } from '@/lib/booking';
import BookingDetailHowToPay from '@/components/ui/booking-detail-how-to-pay';
import RescheduleRoomUnavailableDialog from '@/components/ui/reschedule-room-unavailable-dialog';
import BookingDetailExpiredPaymentSummary from '@/components/ui/booking-detail-expired-payment-summary';
import PaymentExpiredDialog from '@/components/ui/payment-expired-dialog';

export default async function MyBookingPage({
    searchParams,
}: Readonly<{
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}>) {
    const cookieStore = await cookies();
    const at = cookieStore.get('at');
    const decoded: SignInDataResponse | undefined = at?.value
        ? jwtDecode(at.value)
        : undefined;
    if (!decoded) {
        await signOut();
    }
    const t = await getTranslations('BookingDetail');
    const status = (await searchParams).status as keyof typeof BookingStatus;
    const paymentMethodParams = (await searchParams).paymentMethod;
    const showPaidSummary =
        status === 'PAID' || status === 'CANCELLED' || status === 'FAILED';
    return (
        <div
            className="container px-6 2xl:px-0 mx-auto"
            data-testid="my-booking-detail-page"
        >
            <div className="w-full max-w-[1120px] mx-auto my-10 text-neutral-600">
                <h1 className="h1">{t('title')}</h1>
                {status === 'UNPAID' && (
                    <p className="mt-2">
                        {t('desc')}{' '}
                        <span className="font-semibold">09:11 PM</span>
                    </p>
                )}
                {status === 'EXPIRED' && (
                    <p className="mt-2">
                        {t('waitingForPayment')}{' '}
                        <span className="font-semibold">00:00</span>
                    </p>
                )}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-y-6 md:gap-y-0 md:gap-x-6 mt-6">
                    <div className="col-span-3 flex flex-col gap-6">
                        <BookingDetailRoom />
                        {status === 'UNPAID' &&
                            paymentMethodParams === 'va' && (
                                <BookingDetailHowToPay />
                            )}
                        {status !== 'UNPAID' && <BookingDetailPreference />}
                    </div>
                    <div className="col-span-2 flex flex-col gap-6">
                        {status === 'UNPAID' && (
                            <BookingDetailUnpaidPaymentSummary />
                        )}
                        {showPaidSummary && <BookingDetailPaidPaymentSummary />}
                        {status === 'EXPIRED' && (
                            <BookingDetailExpiredPaymentSummary />
                        )}
                    </div>
                </div>
            </div>
            <RescheduleRoomUnavailableDialog />
            <PaymentExpiredDialog />
        </div>
    );
}
