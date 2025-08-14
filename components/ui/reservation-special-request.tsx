'use client';

import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';

export default function ReservationSpecialRequest() {
    const t = useTranslations('Reservation');
    return (
        <section
            id="special-request"
            className="bg-white w-full rounded-sm shadow-sm flex flex-col gap-2 p-4"
        >
            <h2 className="h2">{t('specialRequest')}</h2>
            <Input
                id="special-request-input"
                data-testid="special-request-input"
                placeholder={t('specialRequestPlaceholder')}
            />
            <p className="text-xs">{t('specialRequestHint')}</p>
        </section>
    );
}
