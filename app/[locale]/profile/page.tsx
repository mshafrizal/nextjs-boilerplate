import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';
import { signOut } from '@/lib/AuthActions';
import { getTranslations } from 'next-intl/server';
import { SignInDataResponse } from '@/lib/common';
import { Button } from '@/components/ui/button';
import CountryLabel from '@/components/ui/country-label';
import ProvinceLabel from '@/components/ui/province-label';
import CityLabel from '@/components/ui/city-label';
import PropertyLabel from '@/components/ui/property-label';
import { format } from 'date-fns';
import DiamondIcon from '@/components/icons/diamond-icon';
import SeeMemberDetailButton from '@/components/ui/see-member-detail-button';
import LoyaltyPointSection from '@/components/ui/loyalty-point-section';

export default async function ProfilePage() {
    const cookieStore = await cookies();
    const at = cookieStore.get('at');
    const decoded: SignInDataResponse | undefined = at?.value
        ? jwtDecode(at.value)
        : undefined;
    if (!decoded) {
        await signOut();
    }
    const t = await getTranslations('Profile');
    return (
        <div className="container px-6 2xl:px-0 mx-auto">
            <div
                className={
                    'max-w-[640px] rounded-sm mx-auto my-10 py-10 bg-white text-center h-fit'
                }
            >
                <h1 className="mb-6 text-neutral-600 font-semibold text-xl">
                    {t('title')}
                </h1>
                <div
                    className={
                        'flex flex-col gap-6 max-w-[480px] mx-auto px-6 h-fit'
                    }
                >
                    <section
                        id="preferred-member"
                        data-testid="preferred-member"
                        className="border border-neutral-200 rounded-sm shadow-xs flex flex-col"
                    >
                        <div className="rounded-t-sm bg-linear-to-r from-[#324460] to-[#69698D] px-[17px] py-[19px] flex items-center justify-between">
                            <div className="flex flex-nowrap items-center">
                                <DiamondIcon className="size-8 mr-3" />
                                <p className="text-neutral-50 font-semibold text-xl">
                                    {t('preferredMember')}
                                </p>
                            </div>
                            <SeeMemberDetailButton />
                        </div>
                        <LoyaltyPointSection point={decoded?.point ?? 0} />
                    </section>
                    <section
                        id="account-info"
                        data-testid="account-info"
                        className="flex flex-col gap-2"
                    >
                        <div className="h-10 flex items-center">
                            <h2 className="text-left text-neutral-500 text-lg font-semibold">
                                {t('accountInfo')}
                            </h2>
                        </div>
                        <div className="min-h-10 flex justify-between items-start py-2">
                            <p className="text-neutral-500 mr-3">
                                {t('email')}
                            </p>
                            <p
                                className="text-right text-neutral-500 font-semibold max-w-2/3 break-all"
                                data-testid="email-value"
                            >
                                {decoded?.email}
                            </p>
                        </div>
                        <div className="min-h-10 flex justify-between items-start py-2">
                            <p className="text-neutral-500">
                                {t('phoneNumber')}
                            </p>
                            <div
                                className="text-right text-neutral-500 font-semibold max-w-2/3 break-all"
                                data-testid="phone-number-value"
                            >
                                <span>{decoded?.phone}</span>
                            </div>
                        </div>
                    </section>
                    <section
                        id="personal-info"
                        data-testid="personal-info"
                        className="flex flex-col gap-2"
                    >
                        <div className="h-10 flex items-center">
                            <h2 className="text-left text-neutral-500 text-lg font-semibold">
                                {t('personalInfo')}
                            </h2>
                        </div>
                        <div className="min-h-10 flex justify-between items-start py-2">
                            <p className="text-neutral-500">{t('firstName')}</p>
                            <p
                                className="text-right text-neutral-500 font-semibold max-w-2/3"
                                data-testid="first-name-value"
                            >
                                {decoded?.first_name}
                            </p>
                        </div>
                        <div className="min-h-10 flex justify-between items-start py-2">
                            <p className="text-neutral-500">{t('lastName')}</p>
                            <p
                                className="text-right text-neutral-500 font-semibold max-w-2/3"
                                data-testid="last-name-value"
                            >
                                {decoded?.last_name}
                            </p>
                        </div>
                        <div className="min-h-10 flex justify-between items-start py-2">
                            <p className="text-neutral-500">{t('dob')}</p>
                            <p
                                className="text-right text-neutral-500 font-semibold max-w-2/3"
                                data-testid="dob-value"
                            >
                                {decoded?.birth_date &&
                                    format(decoded?.birth_date, 'dd/MM/yyyy')}
                            </p>
                        </div>
                        <div className="min-h-10 flex justify-between items-start py-2">
                            <p className="text-neutral-500">{t('lastVisit')}</p>
                            <div
                                className="text-right text-neutral-500 font-semibold max-w-2/3"
                                data-testid="last-visit-value"
                            >
                                <PropertyLabel
                                    returnKey="property_name"
                                    id={decoded?.last_visited_id}
                                />
                            </div>
                        </div>
                    </section>
                    <section
                        id="address-info"
                        data-testid="address-info"
                        className="flex flex-col gap-2 h-fit"
                    >
                        <div className="h-10 flex items-center">
                            <h2 className="text-left text-neutral-500 text-lg font-semibold">
                                {t('addressInfo')}
                            </h2>
                        </div>
                        <div className="min-h-10 flex justify-between items-start py-2">
                            <p className="text-neutral-500">{t('country')}</p>
                            <div
                                className="text-right text-neutral-500 font-semibold max-w-2/3"
                                data-testid="country-value"
                            >
                                <CountryLabel
                                    returnKey="country_name"
                                    id={decoded?.country_id}
                                />
                            </div>
                        </div>
                        <div className="min-h-10 flex justify-between items-start py-2">
                            <p className="text-neutral-500">{t('province')}</p>
                            <div
                                className="text-right text-neutral-500 font-semibold max-w-2/3"
                                data-testid="province-value"
                            >
                                <ProvinceLabel
                                    returnKey="province_name"
                                    id={decoded?.province_id}
                                />
                            </div>
                        </div>
                        <div className="min-h-10 flex justify-between items-start py-2">
                            <p className="text-neutral-500">{t('city')}</p>
                            <div
                                className="text-right text-neutral-500 font-semibold max-w-2/3"
                                data-testid="city-value"
                            >
                                <CityLabel
                                    returnKey="city_name"
                                    id={decoded?.city_id}
                                />
                            </div>
                        </div>
                        <div className="min-h-10 flex justify-between items-start py-2">
                            <p className="text-neutral-500">
                                {t('postalCode')}
                            </p>
                            <p
                                className="text-right text-neutral-500 font-semibold max-w-2/3"
                                data-testid="postal-code-value"
                            >
                                {decoded?.postal_code}
                            </p>
                        </div>
                        <div className="min-h-10 flex justify-between items-start py-2">
                            <p className="text-neutral-500">{t('address')}</p>
                            <p
                                className="text-right text-neutral-500 font-semibold max-w-2/3 text-wrap"
                                data-testid="address-value"
                            >
                                {decoded?.address}
                            </p>
                        </div>
                    </section>
                    <Button
                        variant="outline"
                        className="border-yellow-150 text-yellow-150 h-12"
                    >
                        {t('editProfile')}
                    </Button>
                </div>
            </div>
        </div>
    );
}
