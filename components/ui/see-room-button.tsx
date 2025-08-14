'use client';

import { useState } from 'react';
import { DialogDescription, DialogTitle } from '@/components/ui/dialog';
import ImageGallery from '@/components/ui/image-gallery';
import Room1 from '@/app/rooms_1.png';
import Room2 from '@/app/rooms_2.png';
import Room3 from '@/app/rooms_3.png';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import ResponsiveDialog from '@/components/ui/responsive-dialog';

export default function SeeRoomButton() {
    const [open, setOpen] = useState(false);
    return (
        <ResponsiveDialog
            trigger={
                <button className="text-brand-01 text-left text-sm font-semibold cursor-pointer w-fit">
                    See details
                </button>
            }
            open={open}
            setOpen={setOpen}
            desktopChildren={<Content />}
            mobileChildren={<Content />}
            className="max-h-4/5 md:max-w-2xl! lg:max-w-5xl! 2xl:max-w-[1280px]!"
        />
    );
}

function Content() {
    return (
        <div className="p-6 lg:p-0 overflow-y-scroll">
            <DialogTitle className="mb-4">
                Deluxe Signature Twin Room - Non - Refundable Rate
            </DialogTitle>
            <VisuallyHidden>
                <DialogDescription>See</DialogDescription>
            </VisuallyHidden>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                <ImageGallery
                    images={[Room1, Room2, Room3, Room1, Room2, Room3]}
                    className="col-span-3"
                />
                <div className="flex flex-col gap-4 max-h-[500px] lg:overflow-y-scroll col-span-2">
                    <div className="flex flex-col gap-2">
                        <h2 className="h2">Details</h2>
                        <p className="text-neutral-400">
                            (32 sqm, twin beds (110 cm x 200 cm), en-suite
                            bathroom with rain shower) Step into a spacious and
                            refreshing contemporarily-designed room completed a
                            comfortable seating corner for reading or just to
                            relax. This stylish 32sqm room with twin or king
                            sized also features an elegant en-suite granite
                            bathroom with rain shower, a 40” IPTV with
                            international channels, coffee and tea making
                            facilities and minibar. The bedroom is connected by
                            a sliding door to the bathroom to give you an
                            open-space feelings.
                        </p>
                    </div>
                    <div className="flex flex-col gap-2 pb-6">
                        <h2 className="h2">Amenities</h2>
                        <ul
                            className="text-neutral-400 columns-2"
                            data-columns="2"
                        >
                            <li className="ml-5 list-disc">Air Conditioning</li>
                            <li className="ml-5 list-disc">Alarm Clock</li>
                            <li className="ml-5 list-disc">Air Conditioning</li>
                            <li className="ml-5 list-disc">Bath Amenities</li>
                            <li className="ml-5 list-disc">
                                Bathroom with Shower
                            </li>
                            <li className="ml-5 list-disc">
                                Cable-Satellite TV
                            </li>
                            <li className="ml-5 list-disc">City View</li>
                            <li className="ml-5 list-disc">Closet</li>
                            <li className="ml-5 list-disc">
                                Direct dial telephone
                            </li>
                            <li className="ml-5 list-disc">Flat Screen TV</li>
                            <li className="ml-5 list-disc">Guest Laundry</li>
                            <li className="ml-5 list-disc">
                                High-speed Internet Access
                            </li>
                            <li className="ml-5 list-disc">
                                Individually Controlled Air Condition
                            </li>
                            <li className="ml-5 list-disc">
                                Movie & Sport Channels
                            </li>
                            <li className="ml-5 list-disc">Movie Channels</li>
                            <li className="ml-5 list-disc">
                                Non-smoking rooms available
                            </li>
                            <li className="ml-5 list-disc">
                                Individually Controlled Air Condition
                            </li>
                            <li className="ml-5 list-disc">Pool View</li>
                            <li className="ml-5 list-disc">Razor Plug</li>
                            <li className="ml-5 list-disc">Refrigerator</li>
                            <li className="ml-5 list-disc">
                                Room Service (24 hours)
                            </li>
                            <li className="ml-5 list-disc">Safe Deposit Box</li>
                            <li className="ml-5 list-disc">Slippers</li>
                            <li className="ml-5 list-disc">Television</li>
                            <li className="ml-5 list-disc">Wake-up Call</li>
                            <li className="ml-5 list-disc">Welcome Drink</li>
                            <li className="ml-5 list-disc">
                                Wi-Fi Internet Access (free of charge)
                            </li>
                            <li className="ml-5 list-disc">Writing Desk</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
