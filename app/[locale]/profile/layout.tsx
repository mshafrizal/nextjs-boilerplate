import PadmaHeader from '@/components/ui/padma-header';

export default async function ProfileLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}>) {
    return (
        <main className={'min-h-screen w-full overflow-y-auto'}>
            <PadmaHeader className="bg-white" />
            {children}
        </main>
    );
}
