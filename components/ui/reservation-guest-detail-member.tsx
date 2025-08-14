'use client';

import { useTranslations } from 'next-intl';
import { LabeledInput } from '@/components/ui/input';
import { CreateBookingResponse } from '@/lib/booking';
import { SignInDataResponse } from '@/lib/common';
import { useSearchParams } from 'next/navigation';

type GuestDetailProps = Pick<CreateBookingResponse, 'booking_guests'> & {
    formik?: any;
    rooms: number;
    user?: SignInDataResponse;
};

export default function ReservationGuestDetailMember(
    props: Readonly<GuestDetailProps>
) {
    const searchParams = useSearchParams();
    const adultsParams = searchParams.get('adults');
    const childrenParams = searchParams.get('children');
    const infantsParams = searchParams.get('infants');
    const t = useTranslations('Reservation');

    return Array.from({ length: props.rooms }, (_, i) => (
        <div
            key={i}
            className="bg-white w-full rounded-sm shadow-sm flex flex-col gap-4 p-4"
        >
            <h2 className="h2">{t('guestDetails')}</h2>
            {Array.from({ length: parseInt(adultsParams ?? '1') }, (_, key) => (
                <LabeledInput
                    key={key}
                    id={`${t('adult')} ${key}`}
                    data-testid={`${t('adult')} ${key}`}
                    label={`${t('adult')} ${key + 1}`}
                    placeholder={`${t('adult')} ${key + 1}`}
                    className="h-12 text-base"
                    disabled={key === 0}
                    defaultValue={
                        key === 0 && props.user
                            ? `${props.user?.first_name} ${props.user?.last_name}`
                            : ''
                    }
                />
            ))}
            {Array.from(
                { length: parseInt(childrenParams ?? '0') },
                (_, key) => (
                    <LabeledInput
                        key={key}
                        id={`${t('child')} ${key}`}
                        data-testid={`${t('child')} ${key}`}
                        label={`${t('child')} ${key + 1}`}
                        placeholder={`${t('child')} ${key + 1}`}
                        className="h-12 text-base"
                    />
                )
            )}
            {Array.from(
                { length: parseInt(infantsParams ?? '0') },
                (_, key) => (
                    <LabeledInput
                        key={key}
                        id={`${t('infant')} ${key}`}
                        data-testid={`${t('infant')} ${key}`}
                        label={`${t('infant')} ${key + 1}`}
                        placeholder={`${t('infant')} ${key + 1}`}
                        className="h-12 text-base"
                    />
                )
            )}
        </div>
    ));
}
