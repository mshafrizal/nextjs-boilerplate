'use client';

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';

interface ReservationBookingSummaryGalleryProps {
    images?: string[];
}

export default function ReservationBookingSummaryGallery(
    props: Readonly<ReservationBookingSummaryGalleryProps>
) {
    return (
        <Carousel
            className="w-full"
            id="booking-summary-gallery"
            data-testid="booking-summary-gallery"
        >
            <CarouselContent>
                {props.images?.map((img, index) => (
                    <CarouselItem key={index}>
                        <Image
                            src={img}
                            alt={`image-${index}`}
                            width={400}
                            height={225}
                            className="aspect-video w-full rounded-sm"
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="left-4 bg-black/40 disabled:bg-black/40 text-white disabled:text-white disabled:cursor-not-allowed! border-0 hover:bg-black" />
            <CarouselNext className="right-4 bg-black/40 disabled:bg-black/40 text-white disabled:text-white disabled:cursor-not-allowed! border-0 hover:bg-black" />
        </Carousel>
    );
}
