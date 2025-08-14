'use client';

import { useTranslations } from 'next-intl';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import BCA from '@/app/bca.png';
import Mastercard from '@/app/mastercard.png';
import Visa from '@/app/visa.png';
import JCB from '@/app/jcb.png';
import Amex from '@/app/amex.png';
import { useState } from 'react';
import { LabeledInput } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import useThousandSeparator from '@/hooks/useThousandSeparator';

interface ReservationPaymentMethodProps {
    isAuthenticated?: boolean;
}
const initPoints = 16415;
export default function ReservationPaymentMethod(
    props: Readonly<ReservationPaymentMethodProps>
) {
    const t = useTranslations('Reservation');
    const [isRedeemAll, setIsRedeemAll] = useState(true);
    const [points, setPoints] = useState<string>(initPoints.toString());
    const [isPointsError, setIsPointsError] = useState(false);
    const { formatNumber } = useThousandSeparator();
    return (
        <section
            id="payment-method"
            className="bg-white w-full rounded-sm shadow-sm flex flex-col gap-4 p-4"
        >
            <h2 className="h2">{t('paymentMethod')}</h2>
            <div className="flex flex-col gap-5">
                <RadioGroup
                    id={'payment-method-radio'}
                    data-testid={'payment-method-radio'}
                >
                    <div
                        className="flex items-center space-x-2 w-full rounded-sm border border-neutral-200 px-4 py-3"
                        key={'va'}
                    >
                        <RadioGroupItem value={'va'} id={`va-radio-option`} />
                        <Label
                            htmlFor={`va-radio-option`}
                            className="flex justify-between w-full text-base text-neutral-500"
                        >
                            <span>Virtual Account</span>
                            <Image
                                src={BCA}
                                alt={'BCA'}
                                height={24}
                                width={24}
                            />
                        </Label>
                    </div>
                    <div
                        className="flex items-center space-x-2 w-full rounded-sm border border-neutral-200 px-4 py-3"
                        key={'card'}
                    >
                        <RadioGroupItem
                            value={'card'}
                            id={`card-radio-option`}
                        />
                        <Label
                            htmlFor={`card-radio-option`}
                            className="flex justify-between w-full text-base text-neutral-500"
                        >
                            <span>Credit/Debit Card</span>
                            <div className="flex gap-2 items-center">
                                <Image
                                    src={Mastercard}
                                    alt={'Mastercard'}
                                    height={24}
                                    width={24}
                                />
                                <Image
                                    src={Visa}
                                    alt={'Visa'}
                                    height={8}
                                    width={29}
                                />
                                <Image
                                    src={JCB}
                                    alt={'JCB'}
                                    height={20}
                                    width={24}
                                />
                                <Image
                                    src={Amex}
                                    alt={'Amex'}
                                    height={24}
                                    width={29}
                                />
                            </div>
                        </Label>
                    </div>
                </RadioGroup>
            </div>
            {props.isAuthenticated && (
                <div className="bg-neutral-100 p-4 rounded-sm">
                    <p>
                        {t('redeemPoints')}{' '}
                        <span className="font-semibold mb-3">
                            {formatNumber(initPoints)}
                        </span>
                    </p>
                    <div className="flex flex-col gap-2 md:gap-0 md:flex-row md:justify-between md:items-center">
                        <LabeledInput
                            value={formatNumber(Number(points))}
                            onChange={(e) => {
                                // Extract only numbers from the input
                                setIsPointsError(false);
                                const numericValue = e.target.value.replace(
                                    /\D/g,
                                    ''
                                );
                                setPoints(numericValue);
                            }}
                            onBlur={() => {
                                if (isNaN(parseInt(points))) {
                                    setIsPointsError(true);
                                } else {
                                    const numericValue = points.replace(
                                        /\D/g,
                                        ''
                                    );
                                    setIsPointsError(
                                        parseInt(numericValue) > initPoints
                                    );
                                }
                            }}
                            type="number"
                            disabled={Boolean(isRedeemAll)}
                            className="bg-white"
                        />
                        <div className="flex items-center gap-2">
                            <p className="text-sm text-neutral-500 font-medium">
                                {t('redeemAllPoints')}
                            </p>
                            <Checkbox
                                id="redeem-all"
                                data-testid="redeem-all"
                                name="redeem-all"
                                defaultChecked={true}
                                onCheckedChange={(check: boolean) => {
                                    setIsRedeemAll(check);
                                    setIsPointsError(false);
                                    if (check) {
                                        // If "Redeem All" is checked, set points to initPoints
                                        setPoints(initPoints.toString());
                                    }
                                }}
                            />
                        </div>
                    </div>
                    {isPointsError && (
                        <p className="text-sm text-red-500 mt-1">
                            Max redeemed points is {formatNumber(initPoints)}
                        </p>
                    )}
                </div>
            )}
        </section>
    );
}
