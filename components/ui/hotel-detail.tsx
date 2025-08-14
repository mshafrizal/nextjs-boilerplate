'use server';
import HotelPicture from '@/app/hotel.png';
import Image from 'next/image';
export default async function HotelDetail() {
    return (
        <section
            id="hotel-detail"
            data-testid="hotel-detail"
            className="p-6 flex flex-col sm:flex-row gap-4 bg-white shadow-sm rounded-sm"
        >
            <Image
                src={HotelPicture}
                alt="Hotel"
                width={244}
                height={128}
                className="aspect-video w-full sm:max-w-[244px]"
            />
            <div className="flex flex-col gap-2 text-left items-start">
                <h2 className="h2">Padma Resort Ubud</h2>
                <p className="text-neutral-400 break-words">
                    Padma Resort Ubud Banjar Carik, Desa, Puhu, Kec. Payangan,
                    Kabupaten Gianyar, Bali 80572
                </p>
                <a
                    href="https://padmaresortubud.com/"
                    className="text-neutral-400"
                >
                    https://padmaresortubud.com/
                </a>
                <button className="font-semibold text-brand-01 p-0 cursor-pointer">
                    View Detail Hotel
                </button>
            </div>
        </section>
    );
}
