'use server';

import FormSignup from '@/components/forms/form-signup';
import RegisterSuccessDialog from '@/components/ui/register-success-dialog';
import FormSignIn from '@/components/forms/form-signin';
import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';
import ResetPasswordLinkExpiredDialog from '@/components/ui/reset-password-link-expired-dialog';
import AboutUsModal from '@/components/ui/about-us-modal';
import PrivacyModal from '@/components/ui/privacy-modal';
import HomeAward from '@/components/ui/home-award';
import HomeWhyUs from '@/components/ui/home-why-us';
import HomeContactUs from '@/components/ui/home-contact-us';
import MyBookingModal from '@/components/ui/my-booking-modal';
import VerifyEmailLinkExpiredDialog from '@/components/ui/verify-email-link-expired-dialog';
import PadmaHeader from '@/components/ui/padma-header';
import Image from 'next/image';
import GeneralWallpaper from '@/app/general.png';
import HomeFilter from '@/components/ui/home-filter';
import HomeYourNextHoliday from '@/components/ui/home-your-next-holiday';
import DownloadApp from '@/components/ui/download-app';
import HomeFloatingBanner from '@/components/ui/home-floating-banner';

export default async function HomePage() {
    const cookieStore = await cookies();
    const at = cookieStore.get('at');
    const decoded = at?.value ? jwtDecode(at.value) : undefined;
    return (
        <div
            className={'min-h-screen w-screen bg-neutral-100 homepage relative'}
        >
            <PadmaHeader />
            <div className="max-w-[1120px] mx-auto mt-6 lg:mt-10 rounded-lg px-6">
                <Image
                    src={GeneralWallpaper}
                    alt="general wallpaper"
                    className="lg:px-0 object-cover bg-center max-h-[240px] xl:max-h-[448px] rounded-lg"
                    fill={false}
                />
            </div>
            <HomeFilter />
            <HomeYourNextHoliday />
            <HomeAward />
            <main className={'container px-6 sm:px-0 mx-auto pt-10'}>
                <HomeWhyUs />
                <HomeContactUs />
                {!decoded && <FormSignIn />}
                {!decoded && <FormSignup />}
                <RegisterSuccessDialog />
                <ResetPasswordLinkExpiredDialog />
                <VerifyEmailLinkExpiredDialog />
                <AboutUsModal />
                <PrivacyModal />
                <MyBookingModal />
            </main>
            <HomeFloatingBanner />
            <DownloadApp />
        </div>
    );
}
