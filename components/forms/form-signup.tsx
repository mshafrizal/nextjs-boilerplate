'use client';

import { useModalStore } from '@/store/modal';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Separator } from '@/components/ui/separator';
import { cn, commonHeaders } from '@/lib/utils';
import FormStep1 from '@/components/forms/form-signup-1';
import FormStep2 from '@/components/forms/form-signup-2';
import FormStep3 from '@/components/forms/form-signup-3';
import { APIResponse, Country, PaginatedResponse } from '@/lib/common';
import { LoaderCircle } from 'lucide-react';

export default function FormSignup() {
    const t = useTranslations('Auth.SignUp');
    const { isModalSignUpOpen, toggleModalSignUp, toggleModalSignIn } =
        useModalStore();
    const [step, setStep] = useState(0);
    const [indonesia, setIndonesia] = useState<Country | undefined>();

    const initialFormData = {
        // Step 1 values
        email: '',
        phone_country_id: '',
        phone: '',
        password: '',

        // Step 2 values
        first_name: '',
        last_name: '',
        birth_date: undefined as Date | undefined,
        last_visited_id: '',

        // Step 3 values
        country_id: '',
        province_id: '',
        city_id: '',
        state: '',
        city_name: '',
        postal_code: '',
        address: '',
        consent: false,
    };

    const [formData, setFormData] = useState(initialFormData);

    const toLogin = () => {
        toggleModalSignUp();
        toggleModalSignIn();
    };

    const nextStep = () => {
        if (step < 2) setStep(step + 1);
    };

    const prevStep = () => {
        if (step > 0) setStep(step - 1);
    };

    // Function to update form data from each step
    const updateFormData = (stepData: Partial<typeof formData>) => {
        setFormData((prevData) => ({
            ...prevData,
            ...stepData,
        }));
    };

    // Function to reset all form data
    const resetAllForms = () => {
        setFormData(initialFormData);
        setStep(0); // Reset to first step
    };

    const fetchDefaultCode = async (search: string) => {
        const searchParams = new URLSearchParams();
        searchParams.append('search', search);
        searchParams.append('limit', '1');
        const api = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/v1/app/country?${searchParams.toString()}`,
            {
                headers: commonHeaders,
            }
        );
        if (!api.ok) await Promise.reject(new Error(api.statusText));
        const json = (await api.json()) as APIResponse<
            PaginatedResponse<Country>
        >;
        if (json.response_output.list.content.length) {
            setIndonesia(json.response_output.list.content[0]);
        }
        return json.response_output.list.content[0];
    };
    useEffect(() => {
        if (!indonesia) {
            fetchDefaultCode('indonesia').then((country: Country) => {
                updateFormData({
                    phone_country_id: country?.id,
                });
            });
        }
    }, []);

    useEffect(() => {
        if (indonesia) {
            updateFormData({
                phone_country_id: indonesia?.id,
            });
        }
    }, [isModalSignUpOpen]);

    return (
        <Dialog
            open={isModalSignUpOpen}
            onOpenChange={() => {
                resetAllForms();
                toggleModalSignUp();
            }}
        >
            <DialogContent
                showCloseButton={true}
                onEscapeKeyDown={(e) => e.preventDefault()}
                onPointerDownOutside={(e) => e.preventDefault()}
                onInteractOutside={(e) => e.preventDefault()}
                className={'p-6 md:p-10'}
            >
                <DialogHeader className={'sm:py-4'}>
                    <DialogTitle className={'text-center '}>
                        {t('title')}
                    </DialogTitle>
                    <DialogDescription className={'text-center '}>
                        {t('description')}
                    </DialogDescription>
                </DialogHeader>
                <FormStepper step={step} />
                <div className="overflow-hidden relative">
                    {indonesia ? (
                        <FormStep1
                            onNextStep={nextStep}
                            step={step}
                            formData={formData}
                            updateFormData={updateFormData}
                        />
                    ) : (
                        <div className="h-56 flex items-center">
                            <LoaderCircle className={'animate-spin mx-auto'} />
                        </div>
                    )}
                    <FormStep2
                        onNextStep={nextStep}
                        onPrevStep={prevStep}
                        step={step}
                        formData={formData}
                        updateFormData={updateFormData}
                    />
                    <FormStep3
                        onPrevStep={prevStep}
                        step={step}
                        formData={formData}
                        updateFormData={updateFormData}
                        resetAllForms={resetAllForms}
                    />
                </div>
                {step === 0 && (
                    <DialogFooter className={'flex !flex-col'}>
                        <button
                            onClick={toLogin}
                            className="cursor-pointer font-normal text-neutral-500 text-sm sm:text-base"
                        >
                            {t('alreadyHaveAccount')}
                        </button>
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>
    );
}

interface FormStepperProps {
    step: number;
}

interface StepItemProps {
    stepNumber: number;
    currentStep: number;
    label: string;
}

function StepItem({ stepNumber, currentStep, label }: Readonly<StepItemProps>) {
    return (
        <div className={'flex items-center justify-between'}>
            <div
                className={cn(
                    'w-4 h-4 sm:w-7 sm:h-7 rounded-full text-white flex justify-center items-center text-xs sm:text-sm',
                    currentStep >= stepNumber ? 'bg-brand-01' : 'bg-neutral-300'
                )}
            >
                {stepNumber + 1}
            </div>
            <p className={'text-xs text-neutral-500 ml-1 sm:ml-2'}>{label}</p>
        </div>
    );
}

function FormStepper({ step }: Readonly<FormStepperProps>) {
    const t = useTranslations('Auth.SignUp');
    const steps = [t('account'), t('personal'), t('address')];

    return (
        <div
            className={
                'flex items-center justify-between bg-yellow-00 p-2 sm:p-4 rounded-md mx-auto sm:w-full sm:max-w-sm'
            }
        >
            {steps.map((stepLabel, index) => (
                <React.Fragment key={`step-group-${index}`}>
                    <StepItem
                        stepNumber={index}
                        currentStep={step}
                        label={stepLabel}
                    />
                    {index < steps.length - 1 && (
                        <Separator
                            orientation={'horizontal'}
                            className={
                                '!w-6 mx-auto border-neutral-300 border-1'
                            }
                        />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
}
