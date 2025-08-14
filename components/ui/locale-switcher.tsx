import { useLocale, useTranslations } from 'next-intl';
import { routing } from '@/i18n/routing';
import LocaleSwitcherSelect from './locale-switcher-select';
import id from '@/components/flags/id.svg';
import en from '@/components/flags/en.svg';
import ar from '@/components/flags/ar.svg';
import ja from '@/components/flags/ja.svg';
import ko from '@/components/flags/ko.svg';
import zh from '@/components/flags/zh.svg';
import Image from 'next/image';
import { SelectItem } from '@/components/ui/select';
const flags = {
    en: {
        value: en,
        label: 'English',
    },
    id: {
        value: id,
        label: 'Bahasa Indonesia',
    },
    ar: {
        value: ar,
        label: 'Arabic',
    },
    ja: {
        value: ja,
        label: 'Japanese',
    },
    ko: {
        value: ko,
        label: 'Korean',
    },
    zh: {
        value: zh,
        label: 'Chinese',
    },
};
export default function LocaleSwitcher() {
    const t = useTranslations('LocaleSwitcher');
    const locale = useLocale();
    const options = routing.locales.map((locale) => ({
        label: (
            <SelectItem key={locale} value={locale}>
                <Image
                    src={flags[locale].value}
                    alt={locale}
                    width={16}
                    height={16}
                />{' '}
                {flags[locale].label}
            </SelectItem>
        ),
        value: locale,
    }));
    return (
        <LocaleSwitcherSelect defaultValue={locale} label={t('label')}>
            {options.map((loc) => loc.label)}
        </LocaleSwitcherSelect>
    );
}
