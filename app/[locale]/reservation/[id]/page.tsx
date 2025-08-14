'use server';

import { Suspense } from 'react';
import { getLocale, getTranslations } from 'next-intl/server';
import ReservationPersonalInfoMember from '@/components/ui/reservation-personal-info-member';
import ReservationGuestDetailMember from '@/components/ui/reservation-guest-detail-member';
import ReservationGuestPreferences from '@/components/ui/reservation-guest-preferences';
import { redirect } from '@/i18n/navigation';
import { cookies } from 'next/headers';
import {
    APIResponse,
    DetailResponse,
    PaginatedResponse,
    SignInDataResponse,
} from '@/lib/common';
import { Preference } from '@/lib/booking';
import { jwtDecode } from 'jwt-decode';
import { notFound } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import ReservationPaymentMethod from '@/components/ui/reservation-payment-method';
import ReservationExtras from '@/components/ui/reservation-extras';
import ReservationGuestCTA from '@/components/ui/reservation-guest-cta';
import { commonHeaders } from '@/lib/utils';
import { Property } from '@/lib/property';
import ReservationGuestDetailNonmember from '@/components/ui/reservation-guest-detail-nonmember';
import ReservationPersonalInfoNonMember from '@/components/ui/reservation-personal-info-nonmember';
import ReservationPropertyPreferences from '@/components/ui/reservation-property-preferences';
import ReservationBookingSummary from '@/components/ui/reservation-booking-summary';
import ReservationPaymentSummary from '@/components/ui/reservation-payment-summary';
import ReservationNotes from '@/components/ui/reservation-notes';
import ReservationRoomUnavailableDialog from '@/components/ui/reservation-room-unavailable-dialog';
import FormSignIn from '@/components/forms/form-signin';
import ReservationInputPinDialog from '@/components/ui/reservation-input-pin-dialog';
import FormSignup from '@/components/forms/form-signup';
import RegisterSuccessDialog from '@/components/ui/register-success-dialog';
import ReservationSpecialRequest from '@/components/ui/reservation-special-request';
import ReservationCancellationPolicy from '@/components/ui/reservation-cancellation-policy';

interface ReservationPageParams {
    id: string;
    locale: string;
}

// Separate data fetching functions for better organization and reusability
async function getUserData() {
    const cookieStore = await cookies();
    const at = cookieStore.get('at');

    if (!at?.value) {
        return { token: null, userData: null };
    }

    try {
        const userData = jwtDecode(at.value) as SignInDataResponse;
        return { token: at.value, userData };
    } catch (error) {
        console.error('Error decoding JWT token:', error);
        return { token: at.value, userData: null };
    }
}

async function getPropertyDetail(id: string) {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/v1/app/hotel-properties/${id}`,
            {
                headers: commonHeaders,
                next: {
                    revalidate: 60, // Cache for 60 seconds
                    tags: [`booking-${id}`], // Tag for cache invalidation
                },
            }
        );

        if (!response.ok) {
            if (response.status === 404) {
                return null;
            }
            throw new Error(`Failed to fetch booking data: ${response.status}`);
        }

        const data = (await response.json()) as APIResponse<
            DetailResponse<Property>
        >;
        return data.response_output.detail;
    } catch (error) {
        console.error('Error fetching booking data:', error);
        return null;
    }
}

async function getPropertyPreferences(
    propertyId: string,
    token?: string | null
) {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/v1/app/booking/preferences/${propertyId}`,
            {
                headers: {
                    Authorization: token ? `Bearer ${token}` : '',
                    'Content-Type': 'application/json',
                },
                next: {
                    revalidate: 3600, // Cache for 1 hour as preferences don't change often
                    tags: [`preferences-${propertyId}`], // Tag for cache invalidation
                },
            }
        );

        if (!response.ok) {
            return [];
        }

        const data = (await response.json()) as APIResponse<
            PaginatedResponse<Preference>
        >;

        return data.response_output.list.content.sort(
            (a, b) => a.question_order - b.question_order
        );
    } catch (error) {
        console.error('Error fetching property preferences:', error);
        return [];
    }
}

function LoadingComponent() {
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <Loader2 className="animate-spin text-brand-01" size={40} />
        </div>
    );
}

function ErrorComponent({ message }: { message: string }) {
    return (
        <div
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative"
            role="alert"
        >
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{message}</span>
        </div>
    );
}

// Main reservation content component
async function ReservationContent({
    propertyId,
    rooms,
}: Readonly<{
    propertyId: string;
    rooms?: string | string[];
}>) {
    const { token, userData } = await getUserData();
    const propertyData = await getPropertyDetail(propertyId);

    if (!propertyData) {
        notFound();
    }

    const preferences = await getPropertyPreferences(propertyData.id, token);
    const t = await getTranslations('Reservation');

    return (
        <>
            <h2 className="text-neutral-600 font-semibold text-[28px] mb-2">
                {t('title')}
            </h2>
            <p className="text-neutral-500 mb-6">{t('desc')}</p>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="flex flex-col gap-6 lg:col-span-3">
                    {!userData && <ReservationGuestCTA />}
                    {!userData && <ReservationGuestDetailNonmember />}
                    {!userData && <ReservationPersonalInfoNonMember />}
                    {userData && (
                        <ReservationPersonalInfoMember
                            first_name={userData.first_name ?? ''}
                            last_name={userData.last_name ?? ''}
                            email={userData.email ?? ''}
                            phone={userData.phone ?? ''}
                            country_id={userData.country_id ?? ''}
                            province_id={userData.province_id ?? ''}
                            city_id={userData.city_id ?? ''}
                            city_name={userData.city_name ?? ''}
                            state={userData.state ?? ''}
                            address={userData.address ?? ''}
                            postal_code={userData.postal_code ?? ''}
                        />
                    )}
                    {userData && (
                        <ReservationGuestDetailMember
                            user={userData}
                            rooms={parseInt(rooms as string)}
                            booking_guests={[]}
                        />
                    )}
                    {userData && <ReservationSpecialRequest />}
                    <ReservationExtras />
                    <ReservationGuestPreferences preferences={preferences} />
                    <ReservationPaymentMethod
                        isAuthenticated={Boolean(userData)}
                    />
                    {userData && <ReservationCancellationPolicy />}
                    {!userData && <ReservationPropertyPreferences />}
                </div>
                <div className="flex flex-col gap-6 lg:col-span-2">
                    <ReservationBookingSummary />
                    <ReservationPaymentSummary
                        isAuthenticated={Boolean(userData)}
                    />
                    <ReservationNotes />
                </div>
            </div>
        </>
    );
}

/**
 * Reservation page will be accessed by guest and member.
 * Some fields are autofilled if visited by member.
 */
export default async function ReservationPage({
    params,
    searchParams,
}: Readonly<{
    params: Promise<ReservationPageParams>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}>) {
    const locale = await getLocale();
    const { id } = await params; // property id

    if (!id) {
        redirect({ href: '/', locale });
    }
    const rooms = (await searchParams).rooms;
    return (
        <main className="container xl:max-w-[1120px] mx-auto py-10 px-4">
            <Suspense fallback={<LoadingComponent />}>
                <ReservationContent propertyId={id} rooms={rooms} />
            </Suspense>
            <ReservationRoomUnavailableDialog />
            <FormSignIn />
            <ReservationInputPinDialog />
            <RegisterSuccessDialog />
            <FormSignup />
        </main>
    );
}
