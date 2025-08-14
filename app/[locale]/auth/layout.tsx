import { Link } from '@/i18n/navigation';

export default async function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}>) {
    return (
        <main className={'min-h-screen w-full'}>
            <header className={'w-full bg-neutral-100 mb-10'}>
                <ul
                    className={
                        'container max-w-6xl mx-auto flex justify-center gap-4 items-center h-10'
                    }
                >
                    <li>
                        <Link href={'/'}>Home</Link>
                    </li>
                </ul>
            </header>
            {children}
        </main>
    );
}
