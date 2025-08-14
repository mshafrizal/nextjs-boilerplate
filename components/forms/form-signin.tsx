'use client';

import { useModalStore } from '@/store/modal';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import Image from 'next/image';
import Logo from '@/app/logo-1.png';
import { Input, PasswordInput } from '@/components/ui/input';
import React, {
    SyntheticEvent,
    useCallback,
    useEffect,
    useMemo,
    useReducer,
    useState,
} from 'react';
import { Button } from '@/components/ui/button';
import WarningCircleIcon from '@/components/icons/warning-circle-icon';
import { Alert, AlertTitle } from '@/components/ui/alert';
import FormSetPin from './form-set-pin';
import FormForgotPassword from '@/components/forms/form-forgot-password';
import { ChevronLeftIcon } from 'lucide-react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
    APIResponse,
    DetailResponse,
    ErrorResponse,
    SignInDataResponse,
} from '@/lib/common';
import { setTokenInCookie } from '@/lib/AuthActions';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/auth';

// Form view states
enum FormView {
    LOGIN = 'login',
    SET_PIN = 'set-pin',
    FORGOT_PASSWORD = 'forgot-password',
}

const VIEWS = Object.keys(FormView);

// Local state reducer
interface LocalState {
    currentView: FormView;
    at?: string;
}

type LocalAction =
    | { type: 'SET_AT'; payload: string }
    | { type: 'SET_VIEW'; payload: FormView }
    | { type: 'RESET' };

interface LoginFormField {
    email: string;
    password: string;
}

const initialLocalState: LocalState = {
    currentView: FormView.LOGIN,
};

const localStateReducer = (
    state: LocalState,
    action: LocalAction
): LocalState => {
    switch (action.type) {
        case 'SET_AT':
            return { ...state, at: action.payload };
        case 'SET_VIEW':
            return { ...state, currentView: action.payload };
        case 'RESET':
            return initialLocalState;
        default:
            return state;
    }
};

export default function FormSignIn() {
    const locale = useLocale();
    const router = useRouter();
    const params = useSearchParams();
    const pathname = usePathname();
    const { isModalSignInOpen, toggleModalSignIn, toggleModalSignUp } =
        useModalStore();
    const [localState, dispatch] = useReducer(
        localStateReducer,
        initialLocalState
    );

    const showCloseButton = useMemo(
        () => localState.currentView !== FormView.SET_PIN,
        [localState.currentView]
    );

    const dialogTitle = useMemo(
        () =>
            localState.currentView === FormView.SET_PIN ? 'Set PIN' : 'Sign In',
        [localState.currentView]
    );

    const dialogDescription = useMemo(
        () =>
            localState.currentView === FormView.SET_PIN
                ? 'Set up your PIN for transactions'
                : 'Log in to get exclusive rates',
        [localState.currentView]
    );

    const handleForgotPasswordClick = useCallback(
        (e?: SyntheticEvent<HTMLButtonElement>) => {
            e?.stopPropagation();
            dispatch({ type: 'SET_VIEW', payload: FormView.FORGOT_PASSWORD });
            dispatch({ type: 'SET_AT', payload: '' });
        },
        []
    );

    const handleBackToLogin = useCallback(() => {
        dispatch({ type: 'SET_VIEW', payload: FormView.LOGIN });
    }, []);

    const handleClose = useCallback(() => {
        dispatch({ type: 'RESET' });
        router.replace({
            pathname: `${pathname}?${params.toString()}`,
        });
        toggleModalSignIn();
    }, [toggleModalSignIn]);

    const handleDialogChange = useCallback(
        (open: boolean) => {
            if (!open) {
                dispatch({ type: 'RESET' });
                formik.resetForm();
                setErrorMessage('');
            }
            router.replace({
                pathname: pathname,
                query: {},
            });
            toggleModalSignIn();
        },
        [toggleModalSignIn]
    );

    const [errorMessage, setErrorMessage] = useState<string>('');

    const login = async (values: LoginFormField) => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/v1/app/membership/login`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...values,
                        unique_device_id: null,
                        force: false,
                    }),
                }
            );
            if (!res.ok) {
                const errJson =
                    (await res.json()) as APIResponse<ErrorResponse>;
                setErrorMessage(
                    locale === 'id'
                        ? errJson.response_schema.response_message.id
                        : errJson.response_schema.response_message.en
                );
                return;
            }

            const success = (await res.json()) as APIResponse<
                DetailResponse<SignInDataResponse>
            >;
            const token = success.response_output.detail.access_token;
            const refreshToken = success.response_output.detail.refresh_token;

            // Store user data for auth store
            const userData = {
                id: success.response_output.detail.id,
                email: success.response_output.detail.email,
                name: `${success.response_output.detail.first_name} ${success.response_output.detail.last_name}`.trim(),
            };

            // Store tokens in auth store
            useAuthStore.getState().login(token, refreshToken, userData);

            if (!success.response_output.detail.is_pin_exist) {
                dispatch({ type: 'SET_AT', payload: token });
                dispatch({ type: 'SET_VIEW', payload: FormView.SET_PIN });
            } else {
                toggleModalSignIn();
                await setTokenInCookie(token);
            }
        } catch (e) {
            console.log('Something went wrong', e);
        }
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().trim(),
            password: Yup.string().trim(),
        }),
        validateOnBlur: false,
        onSubmit: login,
    });

    const initView = params.get('view') as keyof typeof FormView;
    useEffect(() => {
        if (initView && VIEWS.includes(initView)) {
            toggleModalSignIn();
        }
    }, [initView]);

    useEffect(() => {
        // Reset state when modal opens
        if (isModalSignInOpen) {
            dispatch({ type: 'RESET' });
        }
        if (initView && VIEWS.includes(initView)) {
            handleForgotPasswordClick();
        }
    }, [isModalSignInOpen]);

    // Render helpers
    const renderBackButton = () => (
        <button
            onClick={handleBackToLogin}
            className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 left-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-6"
            aria-label="Back to login"
        >
            <ChevronLeftIcon />
            <span className="sr-only">Back</span>
        </button>
    );

    const renderErrorAlert = () => {
        if (!errorMessage) return null;
        return (
            <Alert className="text-left text-danger-200 bg-danger-00 mb-6 border-none shadow-sm [&>svg]:size-6 has-[>svg]:grid-cols-[calc(var(--spacing)*6)_1fr]">
                <WarningCircleIcon className="w-6 h-6 text-2xl" />
                <AlertTitle className="flex items-end min-h-6 text-sm font-normal">
                    {errorMessage}
                </AlertTitle>
            </Alert>
        );
    };

    function toSignUp() {
        handleClose();
        toggleModalSignUp();
    }

    const renderLoginForm = () => (
        <div className="w-full max-w-sm mx-auto">
            <form
                className="block text-center w-full"
                onSubmit={formik.handleSubmit}
            >
                <Image
                    src={Logo}
                    alt="Padma Hotel Logo"
                    width={100}
                    className="mb-6 mx-auto"
                />
                <h2 className="h2 mb-6 py-4">Log in to your account</h2>
                <div className="mb-4">
                    <Input
                        placeholder="Email address"
                        name="email"
                        type="email"
                        id="email"
                        data-testid="signin-email-input"
                        required
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        className={
                            Boolean(formik.errors.email) ||
                            Boolean(errorMessage)
                                ? 'border-red-500'
                                : ''
                        }
                    />
                </div>

                <div className="mb-6">
                    <PasswordInput
                        id="password"
                        name="password"
                        data-testid="password"
                        placeholder="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        className={
                            Boolean(formik.errors.password) ||
                            Boolean(errorMessage)
                                ? 'border-red-500'
                                : ''
                        }
                    />
                </div>

                {renderErrorAlert()}

                <Button
                    className="mb-2 w-full h-12"
                    type="submit"
                    disabled={
                        formik.isSubmitting ||
                        !formik.values.email ||
                        !formik.values.password
                    }
                >
                    Sign In
                </Button>
            </form>

            <Button
                variant="ghost"
                className="mb-6 w-full h-12"
                type="button"
                onClick={handleForgotPasswordClick}
            >
                Forgot Password
            </Button>

            <div className="pt-6">
                <div className="py-3 text-center">
                    <p className="text-sm text-neutral-400">
                        Having trouble logging in?{' '}
                        <Link
                            href="/contact-us"
                            target="_blank"
                            className="text-brand-01"
                        >
                            Contact us
                        </Link>
                    </p>
                </div>
                <hr />
                <div className="py-3 text-center">
                    <p className="text-sm text-neutral-400">
                        Don&apos;t have an account?{' '}
                        <button
                            onClick={toSignUp}
                            className="text-brand-01 cursor-pointer"
                        >
                            Sign Up
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );

    const renderCurrentView = () => {
        switch (localState.currentView) {
            case FormView.SET_PIN:
                return (
                    <div className="block text-center max-w-sm mx-auto">
                        <FormSetPin at={localState.at} />
                    </div>
                );
            case FormView.FORGOT_PASSWORD:
                return <FormForgotPassword onClose={handleClose} />;
            case FormView.LOGIN:
            default:
                return renderLoginForm();
        }
    };

    return (
        <Dialog open={isModalSignInOpen} onOpenChange={handleDialogChange}>
            <DialogContent
                showCloseButton={showCloseButton}
                onEscapeKeyDown={(e) => e.preventDefault()}
                onPointerDownOutside={(e) => e.preventDefault()}
                onInteractOutside={(e) => e.preventDefault()}
            >
                {localState.currentView === FormView.FORGOT_PASSWORD &&
                    renderBackButton()}
                <DialogClose onClick={handleClose} />
                <DialogHeader>
                    <DialogTitle className="hidden">{dialogTitle}</DialogTitle>
                    <DialogDescription className="hidden">
                        {dialogDescription}
                    </DialogDescription>
                </DialogHeader>

                {renderCurrentView()}
            </DialogContent>
        </Dialog>
    );
}
