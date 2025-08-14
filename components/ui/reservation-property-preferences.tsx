'use client';

import { useTranslations } from 'next-intl';
import { LabeledInput } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Link } from '@/i18n/navigation';
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function ReservationPropertyPreferences() {
    const t = useTranslations('Reservation');
    return (
        <section
            id="property-preferences"
            className="bg-white w-full rounded-sm shadow-sm flex flex-col gap-4 p-4"
        >
            <h2 className="h2">{t('selectPreferences')}</h2>
            <LabeledInput
                id="property-preferences-resident-number"
                data-testid="property-preferences-resident-number"
                label={t('padmaResidentNumber')}
                placeholder={t('padmaResidentNumber')}
            />
            <div className="flex flex-col gap-2">
                <p className="font-medium text-neutral-600">
                    {t('notMemberYet')}
                </p>
                <div className="flex items-center gap-2">
                    <Checkbox
                        id="not-member-yet"
                        required
                        data-testid="not-member-yet"
                        name="notMemberYet"
                        className="border-neutral-200 w-6 h-6"
                    />
                    <Label
                        htmlFor="not-member-yet"
                        className={
                            'inline font-normal text-neutral-500 text-base'
                        }
                    >
                        {t.rich('notMemberYetDesc', {
                            terms: (chunks) => (
                                <Link
                                    href="/terms-and-conditions"
                                    target="_blank"
                                    className="text-brand-01 font-normal underline"
                                >
                                    {chunks}
                                </Link>
                            ),
                        })}
                    </Label>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <p className="font-medium text-neutral-600">{t('firstStay')}</p>
                <RadioGroup
                    id={'payment-method-radio'}
                    data-testid={'payment-method-radio'}
                >
                    <div className="flex items-center gap-2" key={'first'}>
                        <RadioGroupItem
                            value={'first'}
                            id={`first-radio-option`}
                        />
                        <Label
                            htmlFor={`first-radio-option`}
                            className="flex justify-between w-full text-base text-neutral-500 font-normal"
                        >
                            {t('firstVisit')}
                        </Label>
                    </div>
                    <div className="flex items-center gap-2" key={'returning'}>
                        <RadioGroupItem
                            value={'returning'}
                            id={`returning-radio-option`}
                        />
                        <Label
                            htmlFor={`first-radio-option`}
                            className="flex justify-between w-full text-base text-neutral-500 font-normal"
                        >
                            {t('returningGuest')}
                        </Label>
                    </div>
                </RadioGroup>
            </div>
            <div className="flex flex-col gap-2">
                <p className="font-medium text-neutral-600">
                    {t('smokingNonSmoking')}
                </p>
                <RadioGroup id={'smoking-radio'} data-testid={'smoking-radio'}>
                    <div
                        className="flex items-center gap-2"
                        key={'non-smoking'}
                    >
                        <RadioGroupItem
                            value={'non-smoking'}
                            id={`non-smoking-radio-option`}
                        />
                        <Label
                            htmlFor={`non-smoking-radio-option`}
                            className="flex justify-between w-full text-base text-neutral-500 font-normal"
                        >
                            {t('nonSmoking')}
                        </Label>
                    </div>
                    <div className="flex items-center gap-2" key={'smoking'}>
                        <RadioGroupItem
                            value={'smoking'}
                            id={`smoking-radio-option`}
                        />
                        <Label
                            htmlFor={`smoking-radio-option`}
                            className="flex justify-between w-full text-base text-neutral-500 font-normal"
                        >
                            {t('smoking')}
                        </Label>
                    </div>
                </RadioGroup>
            </div>
        </section>
    );
}
