'use client';
import { useTranslations } from 'next-intl';
import { SignInDataResponse } from '@/lib/common';
import { useEffect, useState } from 'react';
import {
    getCityDetail,
    getCountryDetail,
    getProvinceDetail,
} from '@/lib/MasterDataActions';
import { formatMobileNumber, maskEmail } from '@/lib/formatters';

type ReservationPersonalInfoProps = Pick<
    SignInDataResponse,
    | 'first_name'
    | 'last_name'
    | 'email'
    | 'phone'
    | 'country_id'
    | 'province_id'
    | 'city_id'
    | 'city_name'
    | 'state'
    | 'postal_code'
    | 'address'
>;

export default function ReservationPersonalInfoMember(
    props: Readonly<ReservationPersonalInfoProps>
) {
    const t = useTranslations('Reservation');
    const [countryName, setCountryName] = useState<string | undefined>('');
    const [provinceName, setProvinceName] = useState<string | undefined>('');
    const [cityName, setCityName] = useState<string | undefined>('');
    useEffect(() => {
        getCountryDetail(props.country_id)
            .then((e) => setCountryName(e.result?.country_name))
            .catch(console.error);
        getProvinceDetail(props.province_id)
            .then((e) => setProvinceName(e.result?.province_name))
            .catch(console.error);
        getCityDetail(props.city_id)
            .then((e) => setCityName(e.result?.city_name))
            .catch(console.error);
    }, []);
    return (
        <div className="bg-white w-full rounded-sm shadow-sm flex flex-col gap-2 p-4">
            <h2 className="h2">{t('personalInformation')}</h2>
            <div className="flex justify-between py-2 text-neutral-500">
                <p>{t('firstLastName')}</p>
                <p className="font-semibold text-right max-w-1/2 md:max-w-full break-words">
                    {props.first_name} {props.last_name}
                </p>
            </div>
            <div className="flex justify-between py-2 text-neutral-500">
                <p>{t('email')}</p>
                <p className="font-semibold text-right max-w-1/2 md:max-w-full break-words">
                    {maskEmail(props.email)}
                </p>
            </div>
            <div className="flex justify-between py-2 text-neutral-500">
                <p>{t('phoneNumber')}</p>
                <p className="font-semibold text-right">
                    {formatMobileNumber(props.phone)}
                </p>
            </div>
            <div className="flex justify-between py-2 text-neutral-500">
                <p>{t('country')}</p>
                <p className="font-semibold text-right">{countryName}</p>
            </div>
            <div className="flex justify-between py-2 text-neutral-500">
                <p>{t('province')}</p>
                <p className="font-semibold text-right">{provinceName}</p>
            </div>
            <div className="flex justify-between py-2 text-neutral-500">
                <p>{t('city')}</p>
                <p className="font-semibold text-right">{cityName}</p>
            </div>
            <div className="flex justify-between py-2 text-neutral-500">
                <p>{t('postalCode')}</p>
                <p className="font-semibold text-right">{props.postal_code}</p>
            </div>
            <div className="flex justify-between py-2 text-neutral-500">
                <p>{t('address')}</p>
                <p className="font-semibold text-right max-w-1/2">
                    {props.address}
                </p>
            </div>
        </div>
    );
}
