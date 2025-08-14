'use client';

import { useTranslations } from 'next-intl';
import UserCTAIcon from '@/components/icons/user-cta-icon';
import { useModalStore } from '@/store/modal';

export default function ReservationGuestCTA() {
    const t = useTranslations('Reservation');
    const { toggleModalSignIn } = useModalStore();
    return (
        <section
            id="cta"
            data-testid="cta"
            className="bg-white w-full rounded-sm shadow-sm flex flex-col md:flex-row gap-4 md:gap-0 justify-between p-4"
        >
            <div className="flex flex-col md:flex-row text-center md:text-left md:max-w-sm xl:max-w-full items-center gap-2">
                <UserCTAIcon />
                <p>{t('loginCTA')}</p>
            </div>
            <button
                className="font-semibold text-brand-01 cursor-pointer"
                onClick={toggleModalSignIn}
            >
                {t('loginOrSignUp')}
            </button>
        </section>
    );
}
