import { create } from 'zustand';

type Store = {
    isModalSignUpOpen: boolean;
    toggleModalSignUp: () => void;
    isModalVerifyEmailSentOpen: boolean;
    toggleIsModalVerifyEmailSent: () => void;
    isModalSignInOpen: boolean;
    toggleModalSignIn: () => void;
    isResetPasswordExpiredOpen: boolean;
    toggleModalResetPassword: () => void;
    setModalResetPasswordExpired: (open: boolean) => void;
    isResetPasswordSuccessOpen: boolean;
    toggleModalResetPasswordSuccess: () => void;
    isModalAboutUsOpen: boolean;
    toggleModalAboutUs: () => void;
    isModalPrivacyOpen: boolean;
    toggleModalPrivacy: () => void;
    isModalMyBookingOpen: boolean;
    toggleModalMyBooking: () => void;
    isModalVerifyEmailExpiredOpen: boolean;
    toggleModalVerifyEmailExpired: () => void;
    setModalVerifyEmailExpired: (open: boolean) => void;
    isModalRoomUnavailableOpen: boolean;
    toggleModalRoomUnavailable: () => void;
    isModalInputPinOpen: boolean;
    toggleModalInputPin: () => void;
    isModalRescheduleRoomUnavailableOpen: boolean;
    toggleModalRescheduleRoomUnavailableOpen: () => void;
    isModalPaymentExpiredOpen: boolean;
    toggleModalPaymentExpiredOpen: () => void;
};

export const useModalStore = create<Store>()((set) => ({
    isModalSignUpOpen: false,
    toggleModalSignUp: () =>
        set((state) => ({ isModalSignUpOpen: !state.isModalSignUpOpen })),
    isModalVerifyEmailSentOpen: false,
    toggleIsModalVerifyEmailSent: () =>
        set((state) => ({
            isModalVerifyEmailSentOpen: !state.isModalVerifyEmailSentOpen,
        })),
    isModalSignInOpen: false,
    toggleModalSignIn: () =>
        set((state) => ({ isModalSignInOpen: !state.isModalSignInOpen })),
    isResetPasswordExpiredOpen: false,
    toggleModalResetPassword: () =>
        set((state) => ({
            isResetPasswordExpiredOpen: !state.isResetPasswordExpiredOpen,
        })),
    setModalResetPasswordExpired: (open: boolean) =>
        set(() => ({ isResetPasswordExpiredOpen: open })),
    isResetPasswordSuccessOpen: false,
    toggleModalResetPasswordSuccess: () =>
        set((state) => ({
            isResetPasswordSuccessOpen: !state.isResetPasswordSuccessOpen,
        })),
    isModalAboutUsOpen: false,
    toggleModalAboutUs: () =>
        set((state) => ({ isModalAboutUsOpen: !state.isModalAboutUsOpen })),
    isModalPrivacyOpen: false,
    toggleModalPrivacy: () =>
        set((state) => ({ isModalPrivacyOpen: !state.isModalPrivacyOpen })),
    isModalMyBookingOpen: false,
    toggleModalMyBooking: () =>
        set((state) => ({ isModalMyBookingOpen: !state.isModalMyBookingOpen })),
    isModalVerifyEmailExpiredOpen: false,
    toggleModalVerifyEmailExpired: () =>
        set((state) => ({
            isModalVerifyEmailExpiredOpen: !state.isModalVerifyEmailExpiredOpen,
        })),
    setModalVerifyEmailExpired: (open: boolean) =>
        set(() => ({ isModalVerifyEmailExpiredOpen: open })),
    isModalRoomUnavailableOpen: false,
    toggleModalRoomUnavailable: () =>
        set((state) => ({
            isModalRoomUnavailableOpen: !state.isModalRoomUnavailableOpen,
        })),
    isModalInputPinOpen: false,
    toggleModalInputPin: () =>
        set((state) => ({
            isModalInputPinOpen: !state.isModalInputPinOpen,
        })),
    isModalRescheduleRoomUnavailableOpen: false,
    toggleModalRescheduleRoomUnavailableOpen: () =>
        set((state) => ({
            isModalRescheduleRoomUnavailableOpen:
                !state.isModalRescheduleRoomUnavailableOpen,
        })),
    isModalPaymentExpiredOpen: false,
    toggleModalPaymentExpiredOpen: () =>
        set((state) => ({
            isModalPaymentExpiredOpen: !state.isModalPaymentExpiredOpen,
        })),
}));
