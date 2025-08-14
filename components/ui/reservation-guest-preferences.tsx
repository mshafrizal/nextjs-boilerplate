'use client';
// GET /v1/app/booking/preferences/:propertyId
import { Preference } from '@/lib/booking';
import { useTranslations } from 'next-intl';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface ReservationGuestPreferencesProps {
    preferences: Preference[];
}
export default function ReservationGuestPreferences(
    props: Readonly<ReservationGuestPreferencesProps>
) {
    const t = useTranslations('Reservation');
    if (props.preferences.length === 0) return null;
    return (
        <div className="bg-white w-full rounded-sm shadow-sm flex flex-col gap-4 p-4">
            <h2 className="h2">{t('fillPreferences')}</h2>
            {props.preferences.map((preference) => {
                switch (preference.question_type) {
                    case 'textarea':
                        return (
                            <Textarea
                                key={preference.question_label}
                                label={preference.question_label}
                            />
                        );
                    case 'radio':
                        return (
                            <div
                                className="flex flex-col"
                                key={preference.question_label}
                            >
                                <label
                                    htmlFor={`${preference.question_label}-radio`}
                                    data-testid={`${preference.question_label}-label`}
                                    className="mb-2 font-medium text-neutral-600"
                                >
                                    {preference.question_label}
                                </label>
                                <RadioGroup
                                    id={`${preference.question_label}-radio`}
                                    data-testid={`${preference.question_label}-radio`}
                                >
                                    {preference.question_options?.map((opt) => (
                                        <div
                                            className="flex items-center space-x-2"
                                            key={opt}
                                        >
                                            <RadioGroupItem
                                                value={opt}
                                                id={`${opt}-radio-option`}
                                            />
                                            <Label
                                                htmlFor={`${opt}-radio-option`}
                                                className="text-base font-normal text-neutral-500"
                                            >
                                                {opt}
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </div>
                        );
                    default:
                        break;
                }
            })}
        </div>
    );
}
