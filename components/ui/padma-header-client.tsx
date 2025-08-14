'use client';

import MenuDropdown from '@/components/ui/menu-dropdown';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import Logo from '@/app/logo-1.png';
import LocaleSwitcher from '@/components/ui/locale-switcher';
import NavLinks from '@/components/ui/nav-links';
import AuthButtons from '@/components/ui/auth-buttons';

export default function PadmaHeaderClient({
    isAuthenticated,
    at,
}: Readonly<{ isAuthenticated: boolean; at?: string }>) {
    return (
        <header className="bg-transparent w-full py-6 mb-12">
            <div className="container px-6 2xl:px-0 mx-auto flex justify-between">
                <div className="inline-flex gap-10 items-center">
                    <MenuDropdown isAuthenticated={isAuthenticated} />
                    <Link href="/" className="flex items-center">
                        <Image src={Logo} alt="Logo" width={47} height={40} />
                    </Link>
                    <NavLinks />
                </div>

                <nav className="hidden sm:inline-flex items-center gap-6">
                    <LocaleSwitcher />
                    <AuthButtons isAuthenticated={isAuthenticated} at={at} />
                </nav>
            </div>
        </header>
    );
}
