'use client';

import { useTranslations } from 'next-intl';
import React, { useEffect, useMemo, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
    APIResponse,
    Country,
    DetailResponse,
    RegisterPayload,
} from '@/lib/common';
import { AlertCircle } from 'lucide-react';
import CountrySelect from '@/components/ui/country-select';
import ProvinceSelect from '@/components/ui/province-select';
import CitySelect from '@/components/ui/city-select';
import { LabeledInput } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '../ui/checkbox';
import { Label } from '@/components/ui/label';
import { useModalStore } from '@/store/modal';
import { format } from 'date-fns';
import { Link, usePathname } from '@/i18n/navigation';
import { commonHeaders } from '@/lib/utils';

interface FormStep3Props {
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
        consent: boolean;
    };
    updateFormData: (data: Partial<FormStep3Props['formData']>) => void;
    resetAllForms: () => void;
}

interface FormStep3Values {
    country_id: string;
    province_id: string;
    city_id: string;
    state: string;
    city_name: string;
    postal_code: string;
    address: string;
    consent: boolean;
}

export default function FormStep3(props: Readonly<FormStep3Props>) {
    const t = useTranslations('Auth.SignUp');
    const pathname = usePathname();
    const [backendError, setBackendError] = useState<string | null>(null);
    const [isDropdown, setIsDropdown] = useState<boolean>(true);
    const { toggleModalSignUp, toggleIsModalVerifyEmailSent } = useModalStore();
    // Validation schema using Yup
    const validationSchema = Yup.object({
        country_id: Yup.string().required(
            t('validation.required', { name: 'Country' })
        ),
        province_id: isDropdown
            ? Yup.string().required(
                  t('validation.required', { name: 'Province' })
              )
            : Yup.string(),
        city_id: isDropdown
            ? Yup.string().required(t('validation.required', { name: 'City' }))
            : Yup.string(),
        state: !isDropdown
            ? Yup.string().required(
                  t('validation.required', { name: 'State/Province' })
              )
            : Yup.string(),
        city_name: !isDropdown
            ? Yup.string().required(t('validation.required', { name: 'City' }))
            : Yup.string(),
        postal_code: Yup.string(),
        address: Yup.string(),
        consent: Yup.boolean().required(
            t('validation.required', { name: 'Consent' })
        ),
    });
    // Initialize Formik
    const formik = useFormik<FormStep3Values>({
        initialValues: {
            country_id: props.formData.country_id,
            province_id: props.formData.province_id,
            city_id: props.formData.city_id,
            state: props.formData.state,
            city_name: props.formData.city_name,
            postal_code: props.formData.postal_code,
            address: props.formData.address,
            consent: props.formData.consent,
        },
        validationSchema,
        validateOnMount: true,
        onSubmit: async (values) => {
            setBackendError(null);
            try {
                // Update parent form data with values from this step
                props.updateFormData({
                    country_id: values.country_id,
                    province_id: values.province_id,
                    city_id: values.city_id,
                    postal_code: values.postal_code,
                    address: values.address,
                    consent: values.consent,
                });

                // Combine all form data from all steps
                const allFormData: RegisterPayload = {
                    ...props.formData,
                    country_id: values.country_id,
                    province_id: values.province_id,
                    city_id: values.city_id,
                    state: values.state,
                    city_name: values.city_name,
                    postal_code: values.postal_code,
                    address: values.address,
                    birth_date: props.formData.birth_date
                        ? format(props.formData.birth_date, 'yyyy-MM-dd')
                        : '',
                    unique_device_identifier: '',
                    source_of_register: 'WEB',
                    last_visited_id:
                        props.formData.last_visited_id === 'none'
                            ? ''
                            : props.formData.last_visited_id,
                };

                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/v1/app/membership/register`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'app-token': process.env
                                .NEXT_PUBLIC_APP_TOKEN as string,
                        },
                        body: JSON.stringify(allFormData),
                    }
                );

                if (!response.ok) {
                    throw new Error('Failed to submit form');
                }

                await response.json();

                // Reset all forms after successful submission
                props.resetAllForms();

                // Close the modal
                toggleModalSignUp();

                // Show success message or redirect
                toggleIsModalVerifyEmailSent();
                if (pathname.includes('reservation')) {
                    if (typeof window !== undefined)
                        localStorage.setItem(
                            'reservation-redirect-url',
                            pathname
                        );
                }
            } catch (e) {
                console.log('Error register', e);
                setBackendError('An error occurred. Please try again.');
            }
        },
    });

    const hasError = (field: keyof FormStep3Values) =>
        formik.touched[field] && Boolean(formik.errors[field]);

    const getErrorMessage = (field: keyof FormStep3Values) =>
        formik.touched[field] ? formik.errors[field] : '';

    const fetchCountryDetail = async (value: string) => {
        try {
            const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/v1/app/country/${value}`;

            const response = await fetch(apiUrl, {
                headers: commonHeaders,
            });

            if (!response.ok) {
                throw new Error('Failed to submit form');
            }

            const res = (await response.json()) as APIResponse<
                DetailResponse<Country>
            >;
            setIsDropdown(
                res.response_output.detail.country_name.trim().toLowerCase() ===
                    'indonesia' ||
                    res.response_output.detail.country_name
                        .trim()
                        .toLowerCase() === 'australia'
            );
        } catch (e) {
            console.log(`fetch country detail failed`, e);
        }
    };

    useEffect(() => {
        if (formik.values.country_id)
            fetchCountryDetail(formik.values.country_id);
    }, [formik.values.country_id]);

    const isSaveDisabled = useMemo(() => {
        return !formik.isValid || formik.isSubmitting || !formik.values.consent;
    }, [formik]);

    return (
        <form
            onSubmit={formik.handleSubmit}
            className={` transition-transform duration-500 ease-in-out flex flex-col gap-3 sm:gap-6 mx-auto sm:w-full sm:max-w-sm ${
                props.step === 2
                    ? 'translate-x-0'
                    : 'translate-x-full invisible absolute inset-0'
            }`}
        >
            {backendError && (
                <div className="flex items-center gap-2 p-2 mb-2 text-red-500 bg-red-50 rounded">
                    <AlertCircle size={16} />
                    <p className="text-sm">{backendError}</p>
                </div>
            )}
            {props.step === 2 && (
                <div className="flex flex-col gap-1 mt-1">
                    <CountrySelect
                        className="h-12"
                        onChange={async (value) => {
                            await formik.setFieldValue('country_id', value);
                            await formik.setFieldValue(
                                'province_id',
                                '',
                                false
                            );
                            await formik.setFieldValue('city_id', '', false);
                        }}
                        value={formik.values.country_id}
                        onBlur={() => {
                            formik.setFieldTouched('country_id', true, true);
                        }}
                    />
                    {hasError('country_id') && (
                        <div className="flex items-center gap-1 text-red-500">
                            <p
                                className="text-xs"
                                data-testid="country-error-msg"
                            >
                                {getErrorMessage('country_id')}
                            </p>
                        </div>
                    )}
                </div>
            )}

            {props.step === 2 && isDropdown && (
                <div className="flex flex-col gap-1">
                    <ProvinceSelect
                        onChange={async (value) => {
                            await formik.setFieldValue(
                                'province_id',
                                value,
                                true
                            );
                            await formik.setFieldValue('city_id', '');
                        }}
                        onBlur={() => {
                            formik.setFieldTouched('province_id', true, true);
                        }}
                        value={formik.values.province_id}
                        country={formik.values.country_id}
                    />
                    {hasError('province_id') && (
                        <div className="flex items-center gap-1 text-red-500">
                            <p
                                className="text-xs"
                                data-testid="province-error-msg"
                            >
                                {getErrorMessage('province_id')}
                            </p>
                        </div>
                    )}
                </div>
            )}

            {props.step === 2 && isDropdown && (
                <div className="flex flex-col gap-1">
                    <CitySelect
                        onChange={async (value) => {
                            await formik.setFieldValue('city_id', value, true);
                        }}
                        onBlur={() => {
                            formik.setFieldTouched('city_id', true, true);
                        }}
                        value={formik.values.city_id}
                        province={formik.values.province_id}
                    />
                    {hasError('city_id') && (
                        <div className="flex items-center gap-1 text-red-500">
                            <p className="text-xs" data-testid="city-error-msg">
                                {getErrorMessage('city_id')}
                            </p>
                        </div>
                    )}
                </div>
            )}

            {!isDropdown && (
                <div className="flex flex-col gap-1">
                    <LabeledInput
                        onChange={(ev) => {
                            formik.setFieldValue('city_id', '');
                            formik.setFieldValue('province_id', '');
                            formik.setFieldValue('state', ev.target.value);
                        }}
                        onBlur={formik.handleBlur}
                        name="state"
                        id="state"
                        value={formik.values.state}
                        required
                        label={'State/Province'}
                        data-testid="state-input"
                    />
                    {hasError('state') && (
                        <div className="flex items-center gap-1 text-red-500">
                            <p
                                className="text-xs"
                                data-testid="state-error-msg"
                            >
                                {getErrorMessage('state')}
                            </p>
                        </div>
                    )}
                </div>
            )}

            {!isDropdown && (
                <div className="flex flex-col gap-1">
                    <LabeledInput
                        onChange={(ev) => {
                            formik.setFieldValue('city_id', '');
                            formik.setFieldValue('province_id', '');
                            formik.setFieldValue('city_name', ev.target.value);
                        }}
                        onBlur={formik.handleBlur}
                        name="city_name"
                        id="city_name"
                        value={formik.values.city_name}
                        required
                        label={'City'}
                        data-testid="city-input"
                    />
                    {hasError('city_name') && (
                        <div className="flex items-center gap-1 text-red-500">
                            <p className="text-xs" data-testid="city-error-msg">
                                {getErrorMessage('city_name')}
                            </p>
                        </div>
                    )}
                </div>
            )}

            <div className="flex flex-col gap-1">
                <LabeledInput
                    type="text"
                    id="postal_code"
                    name="postal_code"
                    label="Postcode"
                    value={formik.values.postal_code}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    data-testid="postal-code-input"
                />
            </div>

            <div className="flex flex-col gap-1">
                <Textarea
                    id="address"
                    name="address"
                    label="Address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    data-testid="address-input"
                />
            </div>
            <div className="flex flex-col gap-1">
                <div className="flex items-start gap-3">
                    <Checkbox
                        id="consent"
                        required
                        data-testid="consent-checkbox"
                        name="consent"
                        onCheckedChange={(checked: boolean) => {
                            formik.setFieldValue('consent', checked, true);
                        }}
                        onBlur={formik.handleBlur}
                    />
                    <Label
                        htmlFor="consent"
                        className={'inline font-normal text-neutral-300'}
                    >
                        {t.rich('consent', {
                            terms: (chunks) => (
                                <Link
                                    href="/terms-and-conditions"
                                    target="_blank"
                                    className="text-brand-01 font-normal"
                                >
                                    {chunks}
                                </Link>
                            ),
                            privacy: (chunks) => (
                                <Link
                                    href="/privacy-policy"
                                    target="_blank"
                                    className="text-brand-01 font-normal"
                                >
                                    {chunks}
                                </Link>
                            ),
                        })}
                    </Label>
                </div>
                {hasError('consent') && (
                    <div className="flex items-center gap-1 text-red-500">
                        <p className="text-xs">{getErrorMessage('consent')}</p>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Button
                    id={'form-3-prev-step-btn'}
                    variant={'outline'}
                    type="button"
                    onClick={() => props.onPrevStep()}
                    disabled={formik.isSubmitting}
                    className={
                        'py-3 text-sm sm:text-base sm:h-12 font-semibold'
                    }
                >
                    {t('previous')}
                </Button>
                <Button
                    id={'form-3-next-step-btn'}
                    type="submit"
                    disabled={isSaveDisabled}
                    className={
                        'py-3 text-sm sm:text-base sm:h-12 font-semibold'
                    }
                >
                    {formik.isSubmitting ? 'Processing...' : t('signUp')}
                </Button>
            </div>
        </form>
    );
}
