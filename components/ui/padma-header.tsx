'use server';

import Logo from '@/app/logo-1.png';
import { cookies } from 'next/headers';
import MenuDropdown from './menu-dropdown';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import LocaleSwitcher from '@/components/ui/locale-switcher';
import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';
import NavLinks from '@/components/ui/nav-links';
import AuthButtons from '@/components/ui/auth-buttons';

export default async function PadmaHeader(
    props: Readonly<HTMLAttributes<HTMLDivElement>>
) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('at');
    const isAuthenticated = !!accessToken?.value;
    return (
        <header
            className={cn(
                'bg-transparent w-full py-2 md:py-4 bg-white text-neutral-600',
                props.className
            )}
        >
            <div className="container px-6 2xl:px-0 mx-auto flex justify-between">
                <div className="inline-flex gap-10 items-center">
                    <MenuDropdown isAuthenticated={isAuthenticated} />
                    <Link href="/" className="flex items-center">
                        <Image src={Logo} alt="Logo" width={47} height={40} />
                    </Link>
                    <NavLinks />
                </div>

                <nav className="hidden md:inline-flex items-center gap-6">
                    <LocaleSwitcher />
                    <AuthButtons
                        isAuthenticated={isAuthenticated}
                        at={accessToken?.value}
                    />
                </nav>
            </div>
        </header>
    );
}
