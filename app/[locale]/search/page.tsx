'use server';

import { StayDate } from '@/components/ui/stay-date';
import RoomGuest from '@/components/ui/room-guest';
import Hotel from '@/components/ui/hotel';
import '@/app/globals.css';
import SearchRoomButton from '@/components/ui/search-room-button';
export default async function SearchPage({
    searchParams,
}: Readonly<{
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}>) {
    const search = await searchParams;
    return (
        <main className="w-full bg-neutral-100 min-h-screen">
            <div className="bg-white py-2 md:py-4 shadow-[0_6px_8px_rgba(0,0,0,0.08)] sticky top-0 z-10">
                <div className="container mx-auto flex flex-col gap-4 items-center justify-center h-full px-6 2xl:px-0">
                    <div
                        id="search-filter"
                        className="container mx-auto 2xl:px-0"
                    >
                        <div
                            className={
                                'bg-white flex flex-col md:flex-row gap-4 rounded-md border border-neutral-200 p-3 md:p-6'
                            }
                        >
                            <StayDate isAuthenticated={true} />
                            <RoomGuest type="TYPE_2" />
                            <SearchRoomButton />
                        </div>
                    </div>
                </div>
            </div>
            <div className="container px-6 2xl:px-0 mx-auto flex flex-col gap-4 pt-6 pb-[100px]">
                <Hotel property_name="wMvbmOeYAl" searchParams={search} />
                <Hotel property_name="wMvbmOeYAl" searchParams={search} />
                <Hotel property_name="wMvbmOeYAl" searchParams={search} />
            </div>
        </main>
    );
}
