'use client';
import React, { useEffect, useState } from 'react';
import Success from '@/app/success.png';
import Image from 'next/image';
import ToHomeButton from '@/components/ui/to-home-button';
import { useTranslations } from 'next-intl';
export default function AccountVerifiedPage() {
    const t = useTranslations('AccountVerified');
    const [actionLabel, setActionLabel] = useState<string>(t('action'));
    const [actionURL, setActionURL] = useState<string>('');
    useEffect(() => {
        if (typeof window !== undefined) {
            const reservationDraftURL = localStorage.getItem(
                'reservation-redirect-url'
            );
            if (reservationDraftURL) {
                setActionLabel(t('action2'));
                setActionURL('/?view=login');
            } else {
                setActionLabel(t('action'));
                setActionURL('/');
            }
        }
    }, []);
    return (
        <main
            className={
                'container mx-auto pt-10 min-h-screen flex items-center w-full px-4'
            }
        >
            <div className="bg-white mx-auto flex flex-col sm:w-full sm:max-w-[640px] p-10 rounded-md">
                <Image
                    src={Success}
                    alt="Success"
                    className={'mx-auto mb-8'}
                    width={120}
                    height={120}
                />
                <div className="flex flex-col gap-3 mb-10 text-center sm:max-w-[512px] sm:w-full">
                    <h2 className="h2">{t('title')}</h2>
                    <p className="text-neutral-500">{t('desc')}</p>
                </div>
                {actionURL && (
                    <ToHomeButton label={actionLabel} url={actionURL} />
                )}
            </div>
        </main>
    );
}
