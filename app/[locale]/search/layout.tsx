import PadmaHeader from '@/components/ui/padma-header';
export default async function SearchLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}>) {
    return (
        <main className={'min-h-screen w-full bg-brand-02 searchpage'}>
            <PadmaHeader />
            {children}
        </main>
    );
}
