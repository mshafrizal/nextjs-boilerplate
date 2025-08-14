'use client';

import { useTranslations } from 'next-intl';
import ExtraItem from '@/components/ui/extra-item';
import useCounter from '@/hooks/useCounter';

export default function ReservationExtras() {
    const t = useTranslations('Reservation');
    const extra1 = useCounter(0, 0, 1);
    const extra2 = useCounter(0, 0);
    return (
        <section
            id="extras"
            data-testid="extras"
            className="bg-white w-full rounded-sm shadow-sm flex flex-col gap-2 p-4"
        >
            <h2 className="h2">{t('extras')}</h2>
            <ExtraItem
                label={'Extra Bed'}
                description={
                    'An extra-bed hotel provides extra sleeping space for guests.'
                }
                price={150000}
                value={extra1.value}
                increment={extra1.increment}
                decrement={extra1.decrement}
                decrementDisabled={extra1.isDecrementDisabled}
                incrementDisabled={extra1.isIncrementDisabled}
            />
            <ExtraItem
                label={'Iftar Feast'}
                description={
                    'An extra-bed hotel provides extra sleeping space for guests.'
                }
                price={150000}
                value={extra2.value}
                increment={extra2.increment}
                decrement={extra2.decrement}
                decrementDisabled={extra2.isDecrementDisabled}
                incrementDisabled={extra2.isIncrementDisabled}
            />
        </section>
    );
}
