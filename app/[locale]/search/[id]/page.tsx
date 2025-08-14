'use server';

import { StayDate } from '@/components/ui/stay-date';
import RoomGuest from '@/components/ui/room-guest';
import '@/app/globals.css';
import HotelDetail from '@/components/ui/hotel-detail';
import SearchRoomButton from '@/components/ui/search-room-button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CurrencySelect from '@/components/ui/currency-select';
import HotelRoomDetail from '@/components/ui/hotel-room-detail';
export default async function HotelRoomsPage() {
    return (
        <main className="w-full rounded-t-[80px] bg-neutral-100 min-h-screen">
            <div className="container px-6 2xl:px-0 mx-auto flex flex-col gap-4 items-center justify-center h-full">
                <div
                    id="search-filter"
                    className="container mx-auto 2xl:px-0 transform -translate-y-[50px]"
                >
                    <div
                        className={
                            'bg-white flex flex-col md:flex-row gap-4 rounded-md p-6 shadow-sm'
                        }
                    >
                        <StayDate isAuthenticated={true} />
                        <RoomGuest type="TYPE_1" />
                        <SearchRoomButton />
                    </div>
                </div>
            </div>
            <div className="container px-6 2xl:px-0 mx-auto flex flex-col gap-4 -mt-[50px] pt-4 pb-[100px]">
                <HotelDetail />
                <Tabs
                    defaultValue="rate"
                    className="w-full bg-white rounded-sm"
                >
                    <div className="flex justify-between">
                        <TabsList>
                            <TabsTrigger value="rate">
                                Standard Rates
                            </TabsTrigger>
                            <TabsTrigger value="package">
                                Deals & Packages
                            </TabsTrigger>
                        </TabsList>
                        <div className="hidden sm:flex justify-end items-center">
                            <p className="text-xs text-neutral-500">
                                Price Display
                            </p>
                            <CurrencySelect />
                        </div>
                    </div>
                    <TabsContent value="rate">
                        <div className="flex sm:hidden justify-between px-4 items-center">
                            <p className="text-xs text-neutral-500">
                                Price Display
                            </p>
                            <CurrencySelect />
                        </div>
                        <HotelRoomDetail />
                        <HotelRoomDetail />
                    </TabsContent>
                    <TabsContent value="package">
                        <p>Under development</p>
                    </TabsContent>
                </Tabs>
            </div>
        </main>
    );
}
