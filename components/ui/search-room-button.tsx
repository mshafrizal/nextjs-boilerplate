'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import { SearchIcon } from 'lucide-react';

export default function SearchRoomButton() {
    const router = useRouter();
    const params = useSearchParams();
    const hotelId = params.get('hotel');
    function onClick() {
        router.push(`/search/${hotelId}` + '?' + params.toString());
    }
    return (
        <div className="flex items-center justify-center">
            <Button className="w-full md:h-12" onClick={onClick}>
                <SearchIcon /> Search
            </Button>
        </div>
    );
}
