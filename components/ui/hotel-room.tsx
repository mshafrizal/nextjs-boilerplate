'use server';
import Image from 'next/image';
import Room1 from '@/app/rooms_1.png';
import Room2 from '@/app/rooms_2.png';
import Room3 from '@/app/rooms_3.png';
import { Button } from '@/components/ui/button';
import { getTranslations } from 'next-intl/server';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';

export default async function HotelRoom() {
    const t = await getTranslations('Search');
    const images = [Room1, Room2, Room3];
    return (
        <div className="p-3 md:p-4 flex flex-col border border-neutral-200 rounded-lg bg-white">
            <Carousel
                className="w-full"
                id="hotel-room-carousel"
                data-testid="hotel-room-carousel"
                opts={{
                    align: 'start',
                    loop: true,
                }}
                showDots={true}
            >
                <CarouselContent>
                    {images.map((room) => {
                        return (
                            <CarouselItem
                                key={room.src}
                                className="rounded-lg mb-2"
                            >
                                <Image
                                    src={room.src}
                                    alt="room"
                                    width={362}
                                    height={145}
                                    className="w-full max-h-[145px] object-cover rounded-sm"
                                />
                            </CarouselItem>
                        );
                    })}
                </CarouselContent>
                <CarouselPrevious
                    className="left-[10px] bg-black/30 hover:bg-black disabled:cursor-not-allowed! border-0 h-9 w-9"
                    iconClassName="size-5 text-white"
                />
                <CarouselNext
                    className="right-[10px] bg-black/30 hover:bg-black disabled:cursor-not-allowed! border-0 h-9 w-9"
                    iconClassName="size-5 text-white"
                />
            </Carousel>
            <p className="text-neutral-600 font-semibold mb-1 md:mb-2">
                Deluxe Signature King Room - Non - Refundable Rate
            </p>
            <p className="flex gap-4 text-xs font-medium mb-1 md:mb-2">
                <span className="text-yellow-100">Best Value</span>
                <span className="text-neutral-500">Bed & Breakfast</span>
            </p>
            <p className="text-sm text-neutral-500 mb-2 md:mb-4">
                Rate inclusions: Daily breakfast, Internet access, and all
                applicable taxes.
            </p>
            <div className="flex justify-between items-center">
                <div className="flex flex-col">
                    <p className="text-yellow-150 text-xl font-semibold mb-1 md:mb-2">
                        Rp1,400,000
                    </p>
                    <p className="text-neutral-400 text-xs text-right">
                        Includes all taxes & fees
                    </p>
                </div>
                <Button variant="outline" className="h-12 rounded-lg">
                    {t('bookNow')}
                </Button>
            </div>
        </div>
    );
}
