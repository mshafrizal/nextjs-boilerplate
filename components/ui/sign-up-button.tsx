'use client';

import { Button } from '@/components/ui/button';
import { useModalStore } from '@/store/modal';
import { useTranslations } from 'next-intl';

export default function SignUpButton() {
    const t = useTranslations('Home');
    const { toggleModalSignUp } = useModalStore();
    const onClick = () => {
        toggleModalSignUp();
    };
    return (
        <Button
            id={'signup-btn'}
            onClick={onClick}
            data-testid="signup-btn"
            className="px-5"
        >
            {t('signUp')}
        </Button>
    );
}
