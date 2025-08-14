'use server';

import { getTranslations } from 'next-intl/server';
import LocationIcon from '@/components/icons/location-icon';
import PhoneIcon from '@/components/icons/phone-icon';
import EmailIcon from '@/components/icons/email-icon';
import WebsiteIcon from '@/components/icons/website-icon';

export default async function HomeContactUs() {
    const t = await getTranslations('Home');
    return (
        <section
            id="contact-us"
            className="bg-white border border-neutral-200 rounded-md p-6 max-w-[1040px] mx-auto mt-10 mb-10"
        >
            <h2 className="h2 mb-4">{t('contact')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6">
                <div className="flex flex-col gap-2">
                    <div className="inline-flex">
                        <LocationIcon className="text-brand-01 w-6 h-6 mr-2" />
                        <p className="text-neutral-600 grow break-words w-fit">
                            {t('address')}
                        </p>
                    </div>
                    <div className="inline-flex">
                        <PhoneIcon className="text-brand-01 w-6 h-6 mr-2" />
                        <p className="text-neutral-600 grow break-words w-fit">
                            {t('phone')}
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="inline-flex">
                        <EmailIcon className="text-brand-01 w-6 h-6 mr-2" />
                        <p className="text-neutral-600 grow break-all w-fit">
                            {t('email')}
                        </p>
                    </div>
                    <div className="inline-flex">
                        <WebsiteIcon className="text-brand-01 w-6 h-6 mr-2" />
                        <p className="text-neutral-600 grow break-all w-fit">
                            {t('website')}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
