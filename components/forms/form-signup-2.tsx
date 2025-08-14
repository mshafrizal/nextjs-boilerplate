'use client';
import { useTranslations } from 'next-intl';
import React, { useMemo, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { AlertCircle, CalendarIcon } from 'lucide-react';
import { LabeledInput } from '@/components/ui/input';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { DayPicker, getDefaultClassNames } from 'react-day-picker';
import 'react-day-picker/style.css';
import PropertySelect from '@/components/ui/property-select';

interface FormStep2Props {
    onNextStep: () => void;
    onPrevStep: () => void;
    step: number;
    formData: {
        email: string;
        phone_country_id: string;
        phone: string;
        password: string;
        first_name: string;
        last_name: string;
        birth_date: Date | undefined;
        last_visited_id: string;
        country_id: string;
        province_id: string;
        city_id: string;
        state: string;
        city_name: string;
        postal_code: string;
        address: string;
    };
    updateFormData: (data: Partial<FormStep2Props['formData']>) => void;
}

interface FormStep2Values {
    first_name: string;
    last_name: string;
    birth_date: Date | undefined;
    last_visited_id: string;
}

export default function FormStep2(props: Readonly<FormStep2Props>) {
    const t = useTranslations('Auth.SignUp');
    const [backendError, setBackendError] = useState<string | null>(null);
    const [isDobOpen, setIsDobOpen] = useState(false);
    const today = new Date();
    const defaultClassNames = getDefaultClassNames();

    const validationSchema = Yup.object({
        first_name: Yup.string()
            .required(t('validation.required', { name: 'First name' }))
            .max(50, t('validation.firstNameLen')),
        last_name: Yup.string()
            .required(t('validation.required', { name: 'Last name' }))
            .max(50, t('validation.lastNameLen')),
        birth_date: Yup.date().required(
            t('validation.required', { name: 'Date of birth' })
        ),
        last_visited_id: Yup.string().required(
            t('validation.required', { name: 'Last visit' })
        ),
    });

    const formik = useFormik<FormStep2Values>({
        initialValues: {
            first_name: props.formData.first_name,
            last_name: props.formData.last_name,
            birth_date: props.formData.birth_date,
            last_visited_id: props.formData.last_visited_id,
        },
        validateOnBlur: false,
        validationSchema,
        onSubmit: async (values) => {
            setBackendError(null);
            // Update parent form data with values from this step
            props.updateFormData({
                first_name: values.first_name,
                last_name: values.last_name,
                birth_date: values.birth_date,
                last_visited_id: values.last_visited_id,
            });

            props.onNextStep();
        },
    });

    const hasError = (field: keyof FormStep2Values) =>
        formik.touched[field] && Boolean(formik.errors[field]);

    const getErrorMessage = (field: keyof FormStep2Values) =>
        formik.touched[field] ? formik.errors[field] : '';

    const isNextDisabled = useMemo(() => {
        return (
            !formik.isValid ||
            formik.isSubmitting ||
            !formik.values.first_name ||
            !formik.values.last_name ||
            !formik.values.birth_date ||
            !formik.values.last_visited_id
        );
    }, [formik]);

    const isBirthDateSelected = useMemo(() => {
        return Boolean(formik.values.birth_date);
    }, [formik.values.birth_date]);
    return (
        <form
            onSubmit={formik.handleSubmit}
            className={` transition-transform duration-500 ease-in-out flex flex-col gap-3 sm:gap-6 mx-auto sm:w-full sm:max-w-sm ${
                props.step === 1
                    ? 'translate-x-0'
                    : props.step < 1
                      ? 'translate-x-full invisible absolute inset-0'
                      : '-translate-x-full invisible absolute inset-0'
            }`}
        >
            {backendError && (
                <div className="flex items-center gap-2 p-2 mb-2 text-red-500 bg-red-50 rounded">
                    <AlertCircle size={16} />
                    <p className="text-sm">{backendError}</p>
                </div>
            )}

            <div className="flex flex-col gap-1 mt-1">
                <LabeledInput
                    type="text"
                    id="first_name"
                    name="first_name"
                    label={<span>First name</span>}
                    value={formik.values.first_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={hasError('first_name') ? 'border-red-500' : ''}
                    data-testid="first-name-input"
                    required={true}
                />
                {hasError('first_name') && (
                    <div className="flex items-center gap-1 text-red-500">
                        <p
                            className="text-xs"
                            data-testid="first-name-error-msg"
                        >
                            {getErrorMessage('first_name')}
                        </p>
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-1">
                <LabeledInput
                    type="text"
                    id="last_name"
                    name="last_name"
                    label={<span>Last name</span>}
                    value={formik.values.last_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={hasError('last_name') ? 'border-red-500' : ''}
                    data-testid="last-name-input"
                    required={true}
                />
                {hasError('last_name') && (
                    <div className="flex items-center gap-1 text-red-500">
                        <p className="text-xs">
                            {getErrorMessage('last_name')}
                        </p>
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-1">
                <Popover open={isDobOpen} onOpenChange={setIsDobOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            data-testid="datepicker-toggle"
                            type="button"
                            variant={'outline'}
                            className={cn(
                                'group relative w-full justify-between text-left font-normal text-black border-neutral-300 hover:bg-transparent h-12',
                                !formik.values.birth_date &&
                                    'text-muted-foreground',
                                hasError('birth_date') && 'border-red-500'
                            )}
                        >
                            <span>
                                {formik.values?.birth_date?.toLocaleDateString(
                                    'id-ID',
                                    {
                                        month: '2-digit',
                                        day: '2-digit',
                                        year: 'numeric',
                                    }
                                )}
                            </span>
                            <span
                                className={`absolute text-base ${isBirthDateSelected ? 'text-brand-01 px-2 dark:text-brand-01 scale-75 top-2 -translate-y-5 -translate-x-4 rtl:translate-x-1/4 rtl:left-auto bg-white' : 'text-neutral-300 dark:text-gray-400 top-3 z-10 origin-[0] dark:bg-gray-900 px-2 scale-100'} duration-300 transform start-1`}
                            >
                                Date of birth
                                <span
                                    className={`${isBirthDateSelected ? 'text-brand-01' : 'text-red-500'}`}
                                >
                                    &nbsp;*
                                </span>
                            </span>
                            <CalendarIcon />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <DayPicker
                            mode={'single'}
                            captionLayout="dropdown"
                            classNames={{
                                root: `${defaultClassNames.root} px-4 py-2`,
                                today: `text-brand-01`,
                                selected: `bg-brand-01 text-white rounded-full`,
                                chevron: 'fill-brand-01',
                            }}
                            startMonth={new Date(1900, 0)}
                            endMonth={today}
                            disabled={{ after: today }}
                            selected={formik.values.birth_date}
                            onSelect={(date: Date | undefined) => {
                                formik.setFieldValue('birth_date', date);
                                formik.setFieldTouched(
                                    'birth_date',
                                    true,
                                    false
                                );
                                setIsDobOpen(false);
                            }}
                            data-testid="datepicker-input"
                        />
                    </PopoverContent>
                </Popover>
                {hasError('birth_date') && (
                    <div className="flex items-center gap-1 text-red-500">
                        <p
                            className="text-xs"
                            data-testid="birth-date-error-msg"
                        >
                            {getErrorMessage('birth_date')}
                        </p>
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-1">
                <PropertySelect
                    value={formik.values.last_visited_id}
                    onChange={(property) => {
                        formik.setFieldValue('last_visited_id', property);
                        formik.setFieldTouched('last_visited_id', false);
                    }}
                />
                {hasError('last_visited_id') && (
                    <div className="flex items-center gap-1 text-red-500">
                        <p
                            className="text-xs"
                            data-testid="birth-date-error-msg"
                        >
                            {getErrorMessage('last_visited_id')}
                        </p>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Button
                    id={'form-2-prev-step-btn'}
                    variant={'outline'}
                    type="button"
                    onClick={() => props.onPrevStep()}
                    className={
                        'py-3 text-sm sm:text-base sm:h-12 font-semibold'
                    }
                >
                    {t('previous')}
                </Button>
                <Button
                    id={'form-2-next-step-btn'}
                    type="submit"
                    disabled={isNextDisabled}
                    className={
                        'py-3 text-sm sm:text-base sm:h-12 font-semibold'
                    }
                >
                    {formik.isSubmitting ? 'Processing...' : t('nextStep')}
                </Button>
            </div>
        </form>
    );
}
