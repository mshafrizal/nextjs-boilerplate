'use client';

import { useMemo, useState, useCallback, useRef, useEffect } from 'react';
import Image, { StaticImageData } from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageGalleryProps {
    images: string[] | StaticImageData[];
    className?: string;
}

export default function ImageGallery(props: Readonly<ImageGalleryProps>) {
    const [imageIndex, setImageIndex] = useState<number>(0);
    const galleryRef = useRef<HTMLDivElement>(null);

    // Memoize current image based on index
    const currentImage = useMemo(() => {
        if (props.images.length > 0) {
            return props.images[imageIndex];
        }
        return 'https://placehold.co/740x416';
    }, [props.images, imageIndex]);

    // Memoized navigation handlers
    const handlePrevious = useCallback(() => {
        if (imageIndex > 0) {
            setImageIndex(imageIndex - 1);
        }
    }, [imageIndex]);

    const handleNext = useCallback(() => {
        if (imageIndex < props.images.length - 1) {
            // Fixed: was missing -1
            setImageIndex(imageIndex + 1);
        }
    }, [imageIndex, props.images.length]);

    const handleImageClick = useCallback((index: number) => {
        setImageIndex(index);
    }, []);

    // Scroll to the selected image when imageIndex changes
    useEffect(() => {
        if (galleryRef.current) {
            const thumbnails = galleryRef.current.querySelectorAll('img');
            if (thumbnails[imageIndex]) {
                thumbnails[imageIndex].scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center',
                });
            }
        }
    }, [imageIndex]);

    return (
        <div className={cn('flex flex-col gap-4', props.className)}>
            <div className="relative">
                <Image
                    src={currentImage}
                    alt="room image"
                    width={740}
                    height={416}
                    className="aspect-video rounded-sm"
                    priority // Add priority for main image
                />
                <div className="bg-neutral-600/80 px-4 py-[10px] text-sm rounded-full text-white absolute bottom-5 left-5 font-semibold">
                    {imageIndex + 1}/{props.images.length}
                </div>
            </div>
            <div className="flex gap-4">
                <button
                    className="h-[86px] w-8 flex items-center justify-center bg-neutral-600 text-white cursor-pointer hover:bg-neutral-600/80 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handlePrevious}
                    aria-label="Previous image"
                >
                    <ChevronLeft />
                </button>
                <div
                    className="flex justify-start w-full gap-4 overflow-x-scroll"
                    id="image-galleries"
                    ref={galleryRef}
                >
                    {props.images.map((img, i) => (
                        <Image
                            key={i}
                            src={img}
                            alt={`room image ${i + 1}`}
                            width={153}
                            height={86}
                            className={`aspect-video rounded-sm cursor-pointer ${
                                i === imageIndex ? 'border border-brand-01' : ''
                            }`}
                            onClick={() => handleImageClick(i)}
                        />
                    ))}
                </div>
                <button
                    className="h-[86px] w-8 flex items-center justify-center bg-neutral-600 text-white cursor-pointer hover:bg-neutral-600/80 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleNext}
                    aria-label="Next image"
                >
                    <ChevronRight />
                </button>
            </div>
        </div>
    );
}
