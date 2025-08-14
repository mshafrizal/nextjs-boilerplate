'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from '@/i18n/navigation';
import React from 'react';
import { useModalStore } from '@/store/modal';

interface ToHomeButtonProps {
    label: string;
    url: string;
}

export default function ToHomeButton(props: Readonly<ToHomeButtonProps>) {
    const router = useRouter();
    const { toggleModalSignIn } = useModalStore();
    function toHome() {
        router.push(props.url ?? '/');
        if (props.url) toggleModalSignIn();
    }
    return (
        <Button
            className="w-full h-12 sm:max-w-[512px] sm:w-full mx-auto"
            onClick={toHome}
        >
            {props.label}
        </Button>
    );
}
