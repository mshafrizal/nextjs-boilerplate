'use client';

import { useTranslations } from 'next-intl';

export default function ReservationNotes() {
    const t = useTranslations('Reservation');
    return (
        <section
            id="reservation-notes"
            data-testid="reservation-notes"
            className="flex flex-col gap-1 p-4 bg-white shadow-sm rounded-sm"
        >
            <p className="font-medium text-neutral-600">{t('notes')}</p>
            <ul className="">
                <li className="list-disc ml-5 text-neutral-500">
                    Extra bed have to be paid separately in the hotel.
                </li>
                <li className="list-disc ml-5 text-neutral-500">
                    Child will be sharing existing bed with parents.
                </li>
                <li className="list-disc ml-5 text-neutral-500">
                    Special Offers are based on availability and black-out dates
                    apply.
                </li>
                <li className="list-disc ml-5 text-neutral-500">
                    Special Offers are not combinable.
                </li>
                <li className="list-disc ml-5 text-neutral-500">
                    Rates are in Indonesian Rupiah.
                </li>
            </ul>
        </section>
    );
}
