"use client";

import { AppBar, Toolbar, Typography, Select, MenuItem, Box, SelectChangeEvent } from "@mui/material";

import { useMemo, useTransition} from 'react';
import {Locale, usePathname, useRouter} from '@/i18n/routing';

import '@/styles/layout/__header.scss';
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

export default function Header() {
    const lang = useLocale();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const pathname = usePathname();
    const t = useTranslations('Tnc')
    const isPrivacy = useMemo(() => pathname.split('/').at(1) === 'privacy-policy', [pathname])
    const pageTitle = useMemo(() => isPrivacy ? t('Privacy Policy') : t('Terms & Conditions'), [isPrivacy])

    function onChangeLanguage(event: SelectChangeEvent<string>) {
        const nextLocale = event.target.value as Locale;
        startTransition(() => {
            router.replace(
                { pathname },
                { locale: nextLocale }
            );
        });
    }
    
    return (
        <Box className='header-container'>
            <AppBar className="custom-header">
                <Toolbar className="header-content">
                    <Link href={"/"}>
                        <img className="logo" src="/assets/logo/kfc.svg" alt="" />
                    </Link>
                    
                    <Select
                        value={lang}
                        onChange={onChangeLanguage}
                        className="language-selector"
                    >
                        <MenuItem value="en-id">EN</MenuItem>
                        <MenuItem value="id-id">ID</MenuItem>
                    </Select>
                </Toolbar>
            </AppBar>

            <Box className='tnc'>
                <Typography className="title">{pageTitle}</Typography>
            </Box>
        </Box>
    );
}