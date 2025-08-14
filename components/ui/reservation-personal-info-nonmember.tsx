'use client';

import { useTranslations } from 'next-intl';
import { LabeledInput } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
interface ReservationPersonalInfoNonMemberProps {
    formik?: any;
}
export default function ReservationPersonalInfoNonMember(
    props: Readonly<ReservationPersonalInfoNonMemberProps>
) {
    const t = useTranslations('Reservation');
    return (
        <section
            id="personal-info-nonmember"
            className="bg-white w-full rounded-sm shadow-sm flex flex-col gap-4 p-4"
        >
            <h2 className="h2">{t('personalInformation')}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <LabeledInput
                    id={'personal-info-nonmember-address'}
                    data-testid={'personal-info-nonmember-address'}
                    label={t('address')}
                    placeholder={t('address')}
                    required={true}
                    className="h-12 text-base"
                />
                <LabeledInput
                    id={'personal-info-nonmember-city'}
                    data-testid={'personal-info-nonmember-city'}
                    label={t('cityLocation')}
                    placeholder={t('cityLocation')}
                    required={true}
                    className="h-12 text-base"
                />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <LabeledInput
                    id={'personal-info-nonmember-state'}
                    data-testid={'personal-info-nonmember-state'}
                    label={t('stateRegion')}
                    placeholder={t('stateRegion')}
                    required={true}
                    className="h-12 text-base"
                />
                <LabeledInput
                    id={'personal-info-nonmember-postal-zip'}
                    data-testid={'personal-info-nonmember-postal-zip'}
                    label={t('postalCodeZip')}
                    placeholder={t('postalCodeZip')}
                    required={true}
                    className="h-12 text-base"
                />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <LabeledInput
                    id={'personal-info-nonmember-purpose'}
                    data-testid={'personal-info-nonmember-purpose'}
                    label={t('purposeOfStay')}
                    placeholder={t('purposeOfStay')}
                    className="h-12 text-base"
                />
                <LabeledInput
                    id={'personal-info-nonmember-postal-zip'}
                    data-testid={'personal-info-nonmember-postal-zip'}
                    label={t('company')}
                    placeholder={t('company')}
                    className="h-12 text-base"
                />
            </div>
            <Textarea
                id={'personal-info-nonmember-special-request-remarks'}
                data-testid={'personal-info-nonmember-special-request-remarks'}
                label={t('specialRequestRemarks')}
                placeholder={t('specialRequestRemarks')}
            />
            <p className="text-xs text-neutral-300">
                {t('specialRequestRemarksHint')}
            </p>
        </section>
    );
}
