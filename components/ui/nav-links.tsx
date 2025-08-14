import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function NavLinks() {
    const t = useTranslations('PageLayout.links');
    return (
        <div className="hidden md:inline-flex gap-10">
            <Link href="/about" className="font-medium text-sm">
                {t('about')}
            </Link>
            <Link href="/rooms" className="font-medium text-sm">
                {t('rooms')}
            </Link>
        </div>
    );
}
