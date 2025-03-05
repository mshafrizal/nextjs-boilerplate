import {notFound} from 'next/navigation';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {ReactNode} from 'react';
import Layout from '@/components/layout/page';
import {routing} from '@/i18n/routing';
import "@/styles/components/__breadcrumb.scss"

type Props = {
  	children: ReactNode;
  	params: {locale: string};
};

export function generateStaticParams() {
  	return routing.locales.map((locale) => ({locale}));
}

// export async function generateMetadata({
//   params: {locale}
// }: Omit<Props, 'children'>) {
//   const t = await getTranslations({locale, namespace: 'LocaleLayout'});

//   return {
//     title: t('title')
//   };
// }

export default async function LocaleLayout(props: Props) {
	const { children, params } = props;  // Access params safely
	const { locale } = await params;  // Destructure after params is available

	// Ensure that the incoming `locale` is valid
	if (!routing.locales.includes(locale as any)) {
		notFound();
	}

	// Enable static rendering
	setRequestLocale(locale);

	return <Layout locale={locale}>{children}</Layout>;
}