'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';

export default function SearchHotelButton() {
    const router = useRouter();
    const params = useSearchParams();
    function onClick() {
        router.push('/search' + '?' + params.toString());
    }
    return (
        <div className="flex items-center justify-center">
            <Button className="w-full md:h-12" onClick={onClick}>
                Search
            </Button>
        </div>
    );
}
