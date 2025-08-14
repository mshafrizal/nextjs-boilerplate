'use client';

import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function SeeMemberDetailButton() {
    const t = useTranslations('Profile');
    return (
        <Button
            variant="ghost"
            className="text-sm font-semibold text-neutral-00 text-right !px-0 !py-2 hover:bg-transparent hover:text-neutral-00"
            onClick={() => alert('feature on development')}
        >
            <span className="hidden md:block">{t('seeDetails')}</span>
            <ChevronRight className="size-4" />
        </Button>
    );
}
