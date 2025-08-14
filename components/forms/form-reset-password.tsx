'use client';

import { PasswordInput } from '@/components/ui/input';
import { Alert, AlertTitle } from '@/components/ui/alert';
import WarningCircleIcon from '@/components/icons/warning-circle-icon';
import { Button } from '@/components/ui/button';
import React, { useMemo, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { APIResponse, ErrorResponse } from '@/lib/common';
import { useModalStore } from '@/store/modal';
import PasswordStrengthIndicator from '@/components/ui/password-strength-indicator';
import { passwordRegex } from '@/lib/utils';

interface FormValues {
    password: string;
    confirmPassword: string;
}

interface FormResetPasswordProps {
    token?: string | string[];
    onSuccess?: () => void;
}

export default function FormResetPassword(
    props: Readonly<FormResetPasswordProps>
) {
    const { toggleModalResetPasswordSuccess } = useModalStore();
    const [backendError, setBackendError] = useState<
        APIResponse<ErrorResponse> | undefined
    >();
    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .min(8, 'Password does not meet the specification')
                .max(20, 'Password does not meet the specification')
                .matches(
                    passwordRegex,
                    'Password does not meet the specification'
                )
                .required('Password is required'),
            confirmPassword: Yup.string().oneOf(
                [Yup.ref('password')],
                'Password confirmation not match. Please ensure that both passwords match and try again'
            ),
        }),
        onSubmit: async (values) => {
            try {
                setBackendError(undefined);
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/v1/app/membership/reset-password`,
                    {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'app-token': process.env
                                .NEXT_PUBLIC_APP_TOKEN as string,
                        },
                        body: JSON.stringify({
                            password: values.password,
                            token: props.token,
                        }),
                    }
                );
                const json = await res.json();
                if (!res.ok) {
                    setBackendError(json);
                    return;
                }
                toggleModalResetPasswordSuccess();
            } catch (e) {
                console.log('Failed to reset password', e);
            }
        },
    });

    const hasError = (field: keyof FormValues) =>
        formik.touched[field] && Boolean(formik.errors[field]);

    const isSaveDisabled = useMemo(() => {
        return (
            !formik.isValid ||
            formik.isSubmitting ||
            !formik.values.password.length ||
            !formik.values.confirmPassword.length
        );
    }, [formik]);

    return (
        <form
            className="mx-auto w-full max-w-2xl py-10 bg-white rounded-md"
            onSubmit={formik.handleSubmit}
        >
            <div className="w-full max-w-sm mx-auto px-6 md:px-0">
                <div className="py-4 text-center mb-6">
                    <h2 className="h2 mb-2">Reset Password</h2>
                    <p className="text-sm text-neutral-500">
                        Complete the data below to login to your account.
                    </p>
                </div>
                {backendError && (
                    <Alert
                        className={
                            'text-danger-200 bg-danger-00 border-none shadow-sm mb-6'
                        }
                        data-testid="reset-password-backend-error-alert"
                    >
                        <WarningCircleIcon />
                        <AlertTitle
                            className={'text-left font-normal text-danger-200'}
                        >
                            <div className="flex items-center gap-1 text-red-500">
                                <p
                                    className="text-xs"
                                    data-testid="reset-password-backend-error-error-msg"
                                >
                                    {
                                        backendError.response_schema
                                            .response_message.en
                                    }
                                </p>
                            </div>
                        </AlertTitle>
                    </Alert>
                )}
                <div className="flex flex-col gap-6 mb-9">
                    <PasswordInput
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Password"
                        label={<span>Password</span>}
                        id="password"
                        name="password"
                        data-testid="password"
                        className={
                            hasError('password')
                                ? 'border-red-500 focus:ring-red-500'
                                : ''
                        }
                        withLabel={true}
                    />

                    {Boolean(formik.errors.password) && (
                        <Alert
                            className={
                                'text-danger-200 bg-danger-00 border-none shadow-sm'
                            }
                            data-testid="reset-password-alert"
                        >
                            <WarningCircleIcon />
                            <AlertTitle
                                className={
                                    'text-left font-normal text-danger-200'
                                }
                            >
                                <div className="flex items-center gap-1 text-red-500">
                                    <p
                                        className="text-xs"
                                        data-testid="password-error-msg"
                                    >
                                        {formik.errors.password}
                                    </p>
                                </div>
                            </AlertTitle>
                        </Alert>
                    )}

                    <PasswordStrengthIndicator
                        password={formik.values.password}
                        showMakeSure={false}
                    />

                    <PasswordInput
                        id="confirmPassword"
                        name="confirmPassword"
                        data-testid="confirm-password-input"
                        placeholder="Confirm Password"
                        label={<span>Confirm Password</span>}
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={
                            hasError('confirmPassword') ? 'border-red-500' : ''
                        }
                        withLabel={true}
                    />

                    {Boolean(formik.errors.confirmPassword) && (
                        <Alert
                            className={
                                'text-danger-200 bg-danger-00 border-none shadow-sm'
                            }
                            data-testid="reset-password-alert"
                        >
                            <WarningCircleIcon />
                            <AlertTitle
                                className={
                                    'text-left font-normal text-danger-200'
                                }
                            >
                                <div className="flex items-center gap-1 text-red-500">
                                    <p
                                        className="text-xs"
                                        data-testid="confirm-password-error-msg"
                                    >
                                        {formik.errors.confirmPassword}
                                    </p>
                                </div>
                            </AlertTitle>
                        </Alert>
                    )}
                </div>
                <Button
                    type={'submit'}
                    disabled={isSaveDisabled}
                    className="w-full"
                >
                    Save Password{formik.isSubmitting ? '...' : ''}
                </Button>
            </div>
        </form>
    );
}
