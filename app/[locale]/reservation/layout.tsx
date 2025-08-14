import { ReactNode } from 'react';
import PadmaHeaderReservation from '@/components/ui/padma-header-reservation';

export default async function ReservationLayout({
    children,
}: Readonly<{
    children: ReactNode;
    params: Promise<{ locale: string }>;
}>) {
    return (
        <main className={'min-h-screen w-full'}>
            <PadmaHeaderReservation />
            {children}
        </main>
    );
}
