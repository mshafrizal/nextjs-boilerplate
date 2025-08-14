import { MenuIcon } from 'lucide-react';
import Logo from '@/app/logo-1.png';
import Image from 'next/image';
import SignInButton from '@/components/ui/sign-in-button';
import SignUpButton from '@/components/ui/sign-up-button';
import { Link } from '@/i18n/navigation';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import en from '@/components/flags/en.svg';
import id from '@/components/flags/id.svg';
import FormSignIn from '@/components/forms/form-signin';
import FormSignup from '@/components/forms/form-signup';
export default async function ResetPasswordLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen w-full bg-neutral-100">
            <header className="bg-white w-full py-4">
                <div className="container w-full mx-auto flex justify-between">
                    <div className="inline-flex">
                        <button className="flex items-center justify-center p-2">
                            <MenuIcon />
                        </button>
                        <Link href="/" className="flex items-center">
                            <Image
                                src={Logo}
                                alt={'Logo'}
                                width={47}
                                height={40}
                            />
                        </Link>
                    </div>

                    <div
                        className={'hidden sm:inline-flex items-center gap-10'}
                    >
                        <Link href="/voucher">Voucher</Link>
                        <Link href="/booking-code">Booking Code</Link>

                        <Select value="en">
                            <SelectTrigger className="w-[120px] border-none shadow-none">
                                <SelectValue placeholder="Select Language" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="en">
                                        <Image
                                            src={en}
                                            alt={'en'}
                                            width={16}
                                            height={16}
                                        />{' '}
                                        English
                                    </SelectItem>
                                    <SelectItem value="id">
                                        <Image
                                            src={id}
                                            alt={'id'}
                                            width={16}
                                            height={16}
                                        />{' '}
                                        Bahasa Indonesia
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        <div className="flex gap-3">
                            <SignInButton />
                            <SignUpButton />
                        </div>
                    </div>
                </div>
            </header>
            {children}
            <FormSignIn />
            <FormSignup />
        </div>
    );
}
