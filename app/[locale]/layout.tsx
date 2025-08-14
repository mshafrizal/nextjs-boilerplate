import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Work_Sans } from 'next/font/google';
import '../globals.css';
import 'react-day-picker/style.css';
import { Toaster } from '@/components/ui/sonner';
import { CheckCircle2 } from 'lucide-react';
import WarningCircleIcon from '@/components/icons/warning-circle-icon';
const workSans = Work_Sans({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
});

export default async function LocaleLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}>) {
    // Ensure that the incoming `locale` is valid
    const { locale } = await params;
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    return (
        <html lang={locale} className={workSans.className}>
            <body>
                <NextIntlClientProvider>
                    {children}
                    <Toaster
                        position="top-center"
                        className="![--width:340px] xl:![--width:660px]"
                        icons={{
                            success: (
                                <CheckCircle2 className="size-6 text-success-500" />
                            ),
                            error: (
                                <WarningCircleIcon className="text-danger-200" />
                            ),
                        }}
                    />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
