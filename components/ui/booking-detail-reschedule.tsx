'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { DateRange, DayPicker, getDefaultClassNames } from 'react-day-picker';
import { DrawerClose } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import * as React from 'react';
import { useTranslations } from 'next-intl';
import { ChevronRightIcon } from 'lucide-react';
import RoomGuest from '@/components/ui/room-guest';
import CustomCalendarDesktop from '@/components/ui/custom-calendar-desktop';
import SeparatorIcon from '@/components/icons/separator-icon';
import { useRouter } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import { useModalStore } from '@/store/modal';
const ResponsiveDialog = dynamic(
    () => import('@/components/ui/responsive-dialog'),
    { ssr: false }
);

interface BookingDetailRescheduleProps {
    propertyId: string;
    propertyName: string;
}

export default function BookingDetailReschedule(
    props: Readonly<BookingDetailRescheduleProps>
) {
    const [open, setOpen] = useState(false);
    const [_, setStayDate] = useState<DateRange | undefined>();
    const t = useTranslations('BookingDetail');
    const router = useRouter();
    const searchParams = useSearchParams();
    const { toggleModalRescheduleRoomUnavailableOpen } = useModalStore();
    const formatDate = (date?: Date) => {
        return (
            date?.toLocaleDateString('id', {
                month: '2-digit',
                day: '2-digit',
                year: 'numeric',
            }) ?? ''
        );
    };
    function onSelectDate(data: {
        property_id: string;
        stay_date: DateRange | undefined;
    }) {
        if (data.stay_date?.from) {
            if (
                data.stay_date?.from?.getDate() > 1 &&
                data.stay_date?.from?.getDate() < 4
            ) {
                setOpen(false);
                toggleModalRescheduleRoomUnavailableOpen();
                return;
            }
        }
        setStayDate(data.stay_date);
        const query = new URLSearchParams(searchParams.toString());
        query.set('startDate', formatDate(data.stay_date?.from));
        query.set('endDate', formatDate(data.stay_date?.to));
        query.set('hotel', props.propertyId);
        router.push({
            pathname: `/search/${props.propertyId}`,
            query: Object.fromEntries(query),
        });
    }
    return (
        <ResponsiveDialog
            open={open}
            setOpen={setOpen}
            desktopChildren={
                <DesktopContent
                    propertyName={props.propertyName}
                    propertyId={props.propertyId}
                    onSelect={onSelectDate}
                />
            }
            mobileChildren={
                <MobileContent
                    propertyName={props.propertyName}
                    propertyId={props.propertyId}
                    onSelect={onSelectDate}
                />
            }
            trigger={
                <button className="px-4 py-2 bg-neutral-50 rounded-sm text-neutral-500 font-semibold flex justify-between cursor-pointer">
                    {t('reschedule')}{' '}
                    <ChevronRightIcon className="size-6 text-neutral-300" />
                </button>
            }
            className={'min-w-5/6 2xl:min-w-3/4 max-h-[90%] overflow-y-scroll'}
        />
    );
}

interface ContentProps {
    onSelect: (data: {
        property_id: string;
        stay_date: DateRange | undefined;
    }) => void;
    propertyName: string;
    propertyId: string;
}

function DesktopContent(props: Readonly<ContentProps>) {
    const t = useTranslations('Home');
    return (
        <>
            <h2 className="mx-auto font-bold text-neutral-600 textl-lg">
                {t('stayDate')}, {props.propertyName}
            </h2>
            <div className="grid grid-cols-3 items-center">
                <SeparatorIcon className="mx-auto text-neutral-300 max-w-3/4 xl:max-w-5/6" />
                <RoomGuest type="TYPE_1" />
                <SeparatorIcon className="mx-auto text-neutral-300 max-w-3/4 xl:max-w-5/6" />
            </div>
            <CustomCalendarDesktop
                property_id={props.propertyId}
                onSelect={props.onSelect}
                isAuthenticated={false}
            />
        </>
    );
}

function MobileContent(props: Readonly<ContentProps>) {
    const [mobileRangeDate, setMobileRangeDate] = useState<
        DateRange | undefined
    >();
    const today = new Date();
    const defaultClassNames = getDefaultClassNames();
    const t = useTranslations('Home');
    return (
        <>
            <RoomGuest type="TYPE_1" className="px-6 mt-3 mb-6" />
            <DayPicker
                mode="range"
                disabled={{ before: today }}
                selected={mobileRangeDate}
                onSelect={setMobileRangeDate}
                className="mx-auto"
                classNames={{
                    today: 'text-neutral-500 border border-brand-01',
                    selected: `bg-brand-01 border-brand-01 text-white rounded-0`, // Highlight the selected day
                    range_start: `bg-brand-01 text-white rounded-0`,
                    range_end: `bg-brand-01 text-white rounded-0`,
                    range_middle: `bg-brand-01/40`,
                    root: `${defaultClassNames.root}`,
                    chevron: `${defaultClassNames.chevron} fill-brand-01`, // Change the color of the chevron
                }}
            />
            <DrawerClose asChild={true} className="block lg:hidden">
                <div className="container mx-auto p-6">
                    <Button
                        className="w-full mx-auto"
                        onClick={() => {
                            props.onSelect({
                                property_id: props.propertyId,
                                stay_date: mobileRangeDate,
                            });
                        }}
                    >
                        {t('save')}
                    </Button>
                </div>
            </DrawerClose>
        </>
    );
}
