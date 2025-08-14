'use server';
import Image from 'next/image';
import yourNextHoliday from '@/app/yournextholiday.png';
import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/button';
export default async function HomeYourNextHoliday() {
    const t = await getTranslations('Home');
    return (
        <section
            id="home-your-next-holiday"
            data-testid="home-your-next-holiday"
            className=" container mx-auto px-6 sm:px-0 mt-10 lg:mt-0 lg:max-w-[1040px]"
        >
            <h2 className="h2 mb-4">{t('yourNextHoliday')}</h2>
            <div className="p-6 bg-white rounded-lg shadow-xl flex flex-col md:flex-row gap-y-2 md:gap-y-0 md:gap-x-4">
                <Image
                    src={yourNextHoliday}
                    alt="your next holiday"
                    width={280}
                    height={112}
                    className="aspect-video col-span-2 min-w-[280px]"
                />
                <div className="flex flex-col gap-2 grow">
                    <p className="text-neutral-600 font-semibold">
                        Deluxe Signature King Room - Non - Refundable Rate
                    </p>
                    <p className="text-yellow-100">Padma Ubud Bali</p>
                    <p className="text-neutral-500 font-medium">
                        26/07/2025 - 27/07/2025
                    </p>
                    <p className="text-neutral-400 text-sm">
                        Check-in Time: 03:00PM
                    </p>
                </div>
                <div className="flex items-center justify-end grow-0">
                    <Button variant="outline" className="w-full md:w-fit">
                        {t('seeDetails')}
                    </Button>
                </div>
            </div>
        </section>
    );
}
