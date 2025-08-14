'use client';

import { useTranslations } from 'next-intl';
import LoyaltyCoinIcon from '@/components/icons/loyalty-coin-icon';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface LoyaltyPointSectionProps {
    point: number;
}

export default function LoyaltyPointSection(
    props: Readonly<LoyaltyPointSectionProps>
) {
    const t = useTranslations('Profile');
    return (
        <div className="rounded-b-sm bg-white px-4 py-5 flex items-center justify-between">
            <div className="flex flex-nowrap items-center">
                <LoyaltyCoinIcon className="size-7 mr-3" />
                <p className="text-neutral-400 font-semibold">
                    {t('loyaltyPoint')}
                </p>
            </div>
            <Button
                variant="ghost"
                className="font-semibold text-neutral-500 text-right items-center !px-0 !py-2 hover:text-neutral-500 hover:bg-transparent "
                onClick={() => alert('feature on development')}
            >
                {props.point}
                <ChevronRight className="size-4 text-neutral-500" />
            </Button>
        </div>
    );
}
