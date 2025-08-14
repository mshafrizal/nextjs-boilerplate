import { getTranslations } from 'next-intl/server';

export default async function ReservationCancellationPolicy() {
    const t = await getTranslations('Reservation');
    return (
        <section
            id="reservation-cancellation"
            data-testid="reservation-cancellation"
            className="bg-white w-full rounded-sm shadow-sm flex flex-col gap-3 p-4"
        >
            <h2 className="h2">{t('cancellationModification')}</h2>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-[2px]">
                    <p className="font-semibold text-brand-01">
                        Free Cancellation
                    </p>
                    <p className="text-neutral-500">
                        Free-cancellation until 10 days after booking.
                    </p>
                </div>
                <div className="flex flex-col gap-[2px]">
                    <p className="font-semibold text-brand-01">
                        Cancellation Fee
                    </p>
                    <p className="text-neutral-500">
                        Cancellation fee equal to the deposit that you paid.
                    </p>
                </div>
                <div className="flex flex-col gap-[2px]">
                    <p className="font-semibold text-brand-01">
                        Modification Policy
                    </p>
                    <p className="text-neutral-500">
                        This rate is reschedulable until 10 days after booking.
                    </p>
                </div>
            </div>
        </section>
    );
}
