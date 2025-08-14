'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import { StayDate } from '@/components/ui/stay-date';
import RoomGuest from '@/components/ui/room-guest';
import { SearchIcon } from 'lucide-react';
import { useRouter } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';

export default function HomeFilter() {
    const t = useTranslations('Home');
    const router = useRouter();
    const searchParams = useSearchParams();
    const [filter, setFilter] = useState({
        code: '',
        stayDate: undefined,
        rooms: 1,
        adults: 1,
        children: 0,
        infants: 0,
    });
    const onCodeChange = (value: string) => {
        setFilter((prev) => ({ ...prev, code: value }));
    };
    const onRoomGuestChange = (params: URLSearchParams) => {
        const newFilter = {
            rooms: params.has('rooms')
                ? parseInt(params.get('rooms') as string)
                : 1,
            adults: params.has('adults')
                ? parseInt(params.get('adults') as string)
                : 1,
            children: params.has('children')
                ? parseInt(params.get('children') as string)
                : 0,
            infants: params.has('infants')
                ? parseInt(params.get('infants') as string)
                : 0,
        };
        setFilter((prev) => ({ ...prev, ...newFilter }));
    };
    const onSearch = () => {
        const query = new URLSearchParams(searchParams.toString());
        query.set('rooms', filter.rooms.toString());
        query.set('adults', filter.adults.toString());
        query.set('children', filter.children.toString());
        query.set('infants', filter.infants.toString());
        if (filter.code) query.set('code', filter.code);
        router.push({
            pathname: '/search',
            query: Object.fromEntries(query),
        });
    };
    return (
        <section
            id="home-filter"
            data-testid="home-filter"
            className="container w-[calc(100vw-48px)] lg:max-w-[1040px] px-1 lg:px-0 mx-auto mt-0 transform -translate-y-6 md:-translate-y-10"
        >
            <div className="p-6 bg-white rounded-xl shadow-xl ">
                <div className="flex gap-6 items-center">
                    <h2 className="h2 text-nowrap mb-4">
                        {t('availabilitySearch')}
                    </h2>
                    <hr className="border border-[#D0D5DD] grow mb-4" />
                </div>
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row gap-4">
                            <StayDate isAuthenticated={false} />
                            <RoomGuest
                                onStateChange={onRoomGuestChange}
                                type={'TYPE_2'}
                            />
                        </div>
                        <div className="border border-neutral-200 rounded-lg grid md:grid-cols-3 p-4 gap-4">
                            <div>
                                <p className="text-sm font-medium text-neutral-500">
                                    {t('haveACode')}
                                </p>
                                <p className="text-xs text-neutral-400">
                                    {t('enterYourCode')}
                                </p>
                            </div>
                            <Select onValueChange={onCodeChange}>
                                <SelectTrigger className="bg-neutral-50 border-none h-9! text-xs w-full">
                                    <SelectValue
                                        placeholder={t('chooseCode')}
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="voucher">
                                        {t('voucherCode')}
                                    </SelectItem>
                                    <SelectItem value="booking">
                                        {t('bookingCode')}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <Input
                                className="h-9 text-xs! disabled:border-0"
                                placeholder={t('inputCode')}
                                disabled={!filter.code}
                            />
                        </div>
                    </div>
                    <Button className="h-12" onClick={() => onSearch()}>
                        <SearchIcon className="text-white" />
                        {t('search')}
                    </Button>
                </div>
            </div>
        </section>
    );
}
