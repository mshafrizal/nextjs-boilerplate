'use client';

import { useTranslations } from 'next-intl';
import CountrySelect from '@/components/ui/country-select';
import { useState } from 'react';
import { LabeledInput } from '@/components/ui/input';

export default function ReservationGuestDetailNonmember() {
    const t = useTranslations('Reservation');
    const [country, setCountry] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    return (
        <section
            id="guest-detail-nonmember"
            data-testid="guest-detail-nonmember"
            className="bg-white w-full rounded-sm shadow-sm flex flex-col gap-4 p-4"
        >
            <h2 className="h2">{t('guestDetails')}</h2>
            <CountrySelect
                onChange={setCountry}
                onBlur={() => {}}
                value={country}
                className={'h-12'}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <LabeledInput
                    id="guest-detail-nonmember-first-name"
                    data-testid="guest-detail-nonmember-first-name"
                    label={t('firstName')}
                    placeholder={t('firstName')}
                    value={firstName}
                    required
                    onChange={(e) => setFirstName(e.target.value)}
                    className="h-12 text-base"
                />
                <LabeledInput
                    id="guest-detail-nonmember-last-name"
                    data-testid="guest-detail-nonmember-last-name"
                    label={t('lastName')}
                    placeholder={t('lastName')}
                    value={lastName}
                    required
                    onChange={(e) => setLastName(e.target.value)}
                    className="h-12 text-base"
                />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <LabeledInput
                    id="guest-detail-nonmember-email"
                    data-testid="guest-detail-nonmember-email"
                    label={t('email')}
                    placeholder={t('email')}
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 text-base"
                />
                <LabeledInput
                    id="guest-detail-nonmember-phone"
                    data-testid="guest-detail-nonmember-phone"
                    label={t('phone')}
                    placeholder={t('phone')}
                    value={phone}
                    required
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-12 text-base"
                />
            </div>
        </section>
    );
}
