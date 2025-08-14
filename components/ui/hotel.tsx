'use server';

import { ChevronRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import HotelRoom from '@/components/ui/hotel-room';
interface HotelProps {
    property_name?: string;
    searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function Hotel(props: Readonly<HotelProps>) {
    const sParams = new URLSearchParams();
    Object.entries(props.searchParams ?? {}).forEach(([key, value]) =>
        sParams.append(key, value as string)
    );
    return (
        <li className="shadow-md list-none rounded-sm">
            <div className="flex justify-between px-3 md:px-6 py-2 md:py-4 bg-brand-02 text-yellow-300 rounded-t-sm">
                <h2 className="h2 text-yellow-300">Padma Resort Ubud</h2>
                <Link
                    href={`/search/${props.property_name}?${sParams.toString()}`}
                    className="flex items-center font-semibold text-yellow-200"
                >
                    <span className="hidden md:block">See All Result</span>{' '}
                    <ChevronRight className="ml-2" />
                </Link>
            </div>
            <div className="bg-white p-3 md:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 md:gap-y-4 rounded-b-sm">
                <HotelRoom />
                <HotelRoom />
                <HotelRoom />
                <HotelRoom />
                <HotelRoom />
                <HotelRoom />
            </div>
        </li>
    );
}
