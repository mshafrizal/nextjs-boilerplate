'use client';
import { useTranslations } from 'next-intl';
import React, { FocusEvent, useMemo, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { APIResponse, ErrorResponse } from '@/lib/common';
import { AlertCircle } from 'lucide-react';
import { LabeledInput, PasswordInput } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import PhoneCodeSelect from '@/components/ui/phone-code-select';
import PasswordStrengthIndicator from '@/components/ui/password-strength-indicator';
import { passwordRegex } from '@/lib/utils';

export interface FormStep1Props {
    onNextStep: () => void;
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
    updateFormData: (data: Partial<FormStep1Props['formData']>) => void;
}

interface FormValues {
    email: string;
    phone_country_id: string;
    phone: string;
    password: string;
}

export default function FormStep1(props: Readonly<FormStep1Props>) {
    const t = useTranslations('Auth.SignUp');
    const [backendError, setBackendError] = useState<string | null>(null);

    const validationSchema = Yup.object({
        email: Yup.string()
            .trim()
            .email(t('validation.email'))
            .required(t('validation.required', { name: 'Email' })),
        phone_country_id: Yup.string(),
        phone: Yup.string()
            .trim()
            .required(t('validation.required', { name: 'Phone number' }))
            .max(20, t('validation.phoneLen'))
            .matches(/^\d+$/, 'Phone number format is incorrect'),
        password: Yup.string()
            .trim()
            .min(8, t('validation.password'))
            .max(20, t('validation.password'))
            .matches(passwordRegex, t('validation.password'))
            .required(t('validation.required', { name: 'Password' })),
    });

    const formik = useFormik<FormValues>({
        initialValues: {
            email: props.formData.email,
            phone_country_id: props.formData.phone_country_id,
            phone: props.formData.phone,
            password: props.formData.password,
        },
        validateOnBlur: false,
        validationSchema,
        onSubmit: async (values) => {
            setBackendError(null);
            try {
                // Update parent form data with values from this step
                props.updateFormData({
                    email: values.email,
                    phone_country_id: values.phone_country_id,
                    phone: values.phone,
                    password: values.password,
                });

                const api = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/v1/app/membership/check-exist`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'app-token': process.env
                                .NEXT_PUBLIC_APP_TOKEN as string,
                        },
                        body: JSON.stringify({
                            email: values.email,
                            phone: values.phone,
                        }),
                    }
                );

                const res = await api.json();

                if (!api.ok) {
                    const error = res as APIResponse<ErrorResponse>;
                    const emailError = error.response_output.errors?.find(
                        (err) => err.field === 'email'
                    );
                    if (emailError) {
                        await formik.setFieldTouched('email', true);
                        formik.setFieldError(
                            'email',
                            'Email already registered, please use another email'
                        );
                    } else {
                        setBackendError(
                            error.response_schema.response_message.en ||
                                'An error occurred'
                        );
                    }
                } else {
                    props.onNextStep();
                }
            } catch (e) {
                console.log('Error check member', e);
                setBackendError('An error occurred. Please try again.');
            }
        },
    });

    const hasError = (field: keyof FormValues) =>
        formik.touched[field] && Boolean(formik.errors[field]);

    const getErrorMessage = (field: keyof FormValues) =>
        formik.touched[field] ? formik.errors[field] : '';

    const isNextDisabled = useMemo(() => {
        return (
            !formik.isValid ||
            formik.isSubmitting ||
            !formik.values.email ||
            !formik.values.password ||
            !formik.values.phone
        );
    }, [formik]);

    const removeLeadingZero = (phone: string): string => {
        return phone.replace(/^0+/, '');
    };

    const onPhoneNumberBlur = (e: FocusEvent<HTMLInputElement>) => {
        const cleaned = removeLeadingZero(e.target.value);
        formik.setFieldValue('phone', cleaned);
        formik.handleBlur(e);
    };
    return (
        <form
            onSubmit={formik.handleSubmit}
            className={`transition-transform duration-500 ease-in-out flex flex-col gap-3 sm:gap-6 sm:w-full sm:max-w-sm sm:mx-auto ${props.step === 0 ? 'translate-x-0' : '-translate-x-full invisible absolute inset-0'}`}
        >
            {backendError && (
                <div className="flex items-center gap-2 p-2 mb-2 text-red-500 bg-red-50 rounded">
                    <AlertCircle size={16} />
                    <p className="text-sm">{backendError}</p>
                </div>
            )}

            <div className="flex flex-col gap-1 mt-1">
                <LabeledInput
                    type="email"
                    id="email"
                    name="email"
                    label={<span>Email</span>}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    className={hasError('email') ? 'border-red-500' : ''}
                    data-testid="email-input"
                    required={true}
                />
                {hasError('email') && (
                    <div className="flex items-center gap-1 text-red-500">
                        <p className="text-xs" data-testid="email-error-msg">
                            {getErrorMessage('email')}
                        </p>
                    </div>
                )}
            </div>

            <div className="flex gap-2">
                <div className="w-25">
                    <PhoneCodeSelect
                        value={formik.values.phone_country_id}
                        onChange={(value) => {
                            formik.setFieldValue('phone_country_id', value);
                            formik.setFieldTouched('phone_country_id', false);
                        }}
                    />
                </div>
                <div className="flex-1 flex flex-col gap-1">
                    <LabeledInput
                        type="tel"
                        id="phone"
                        name="phone"
                        label={<span>Phone Number</span>}
                        onChange={formik.handleChange}
                        onBlur={onPhoneNumberBlur}
                        value={formik.values.phone}
                        className={hasError('phone') ? 'border-red-500' : ''}
                        data-testid="phone-input"
                        required={true}
                    />
                    {hasError('phone') && (
                        <div className="flex items-center gap-1 text-red-500">
                            <p
                                className="text-xs"
                                data-testid="phone-error-msg"
                            >
                                {getErrorMessage('phone')}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <PasswordInput
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    label={<span>Password</span>}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={hasError('password') ? 'border-red-500' : ''}
                    data-testid="password-input"
                    aria-modal={true}
                    withLabel={true}
                    required={true}
                />
                {hasError('password') && (
                    <div className="flex items-center gap-1 text-red-500">
                        <p className="text-xs" data-testid="phone-error-msg">
                            {getErrorMessage('password')}
                        </p>
                    </div>
                )}
            </div>

            <PasswordStrengthIndicator
                password={formik.values.password}
                showMakeSure={true}
                className="mb-9"
            />

            <Button
                type={'submit'}
                disabled={isNextDisabled}
                className={'py-3 text-sm sm:text-base sm:h-12 font-semibold'}
            >
                {formik.isSubmitting ? 'Processing...' : t('nextStep')}
            </Button>
        </form>
    );
}
