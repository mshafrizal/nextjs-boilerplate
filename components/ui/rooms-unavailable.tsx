import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Failed1 from '@/app/failed_1.png';
export default async function RoomsUnavailable() {
    const t = await getTranslations('Search');
    return (
        <section
            id="rooms-unavailable"
            className="flex flex-col items-center justify-center w-full max-w-[640px] mx-auto py-[120px]"
        >
            <Image
                src={Failed1}
                alt="Not Found"
                width={120}
                height={120}
                className="mb-6"
            />
            <h2 className="h2 mb-2 max-w-lg mx-auto text-center">
                {t('noRoomsTitle')}
            </h2>
            <p className="text-neutral-500 max-w-lg mx-auto text-center">
                {t('noRoomsDesc')}
            </p>
        </section>
    );
}
