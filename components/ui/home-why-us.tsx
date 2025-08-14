'use server';

import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
export default async function HomeWhyUs() {
    const t = await getTranslations('Home');
    return (
        <section
            id="why-us"
            className="grid grid-cols-1 lg:grid-cols-2 gap-4 bg-white border border-neutral-200 rounded-lg p-6 max-w-[1040px] mx-auto"
        >
            <Image
                src="/images/whyusbg.webp"
                width={434}
                height={244}
                alt="whyusbg"
                className="w-full lg:max-w-[434px] aspect-video rounded-lg"
            />
            <div className="flex flex-col gap-4">
                <h2 className="h2">{t('whyUs')}</h2>
                <div className="flex gap-2 flex-col items-center text-neutral-600">
                    <ul className="list-disc pl-5">
                        <li>{t('whyUs1')}</li>
                        <li>{t('whyUs2')}</li>
                        <li>
                            {t('whyUs3')}
                            <span className="text-danger-100">*</span>
                        </li>
                        <li>
                            {t('whyUs4')}
                            <span className="text-danger-100">*</span>
                        </li>
                        <li>{t('whyUs5')}</li>
                    </ul>
                    <p className="text-xs italic">
                        <span className="text-danger-100">*</span>
                        {t('whyUsNote')}
                    </p>
                </div>
            </div>
        </section>
    );
}
