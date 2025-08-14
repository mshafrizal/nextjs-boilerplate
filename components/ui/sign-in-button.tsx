'use client';

import { Button } from '@/components/ui/button';
import { useModalStore } from '@/store/modal';
import { useTranslations } from 'next-intl';

export default function SignInButton() {
    const t = useTranslations('Home');
    const { toggleModalSignIn } = useModalStore();
    const onClick = () => {
        toggleModalSignIn();
    };
    return (
        <Button
            id={'login-btn'}
            variant={'outline'}
            onClick={onClick}
            data-testid="login-btn"
            className="px-7 py-[10px]"
        >
            {t('login')}
        </Button>
    );
}
