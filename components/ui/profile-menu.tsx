'use client';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from './button';
import UserCurvedIcon from '@/components/icons/user-curved-icon';
import { ArrowRight } from 'lucide-react';
import { signOut } from '@/lib/AuthActions';
import { useRouter } from '@/i18n/navigation';
import { jwtDecode } from 'jwt-decode';
import { SignInDataResponse } from '@/lib/common';
import DiamondIcon from '@/components/icons/diamond-icon';
import { useEffect } from 'react';

export default function ProfileMenu(props: Readonly<{ at?: string }>) {
    const router = useRouter();
    const decoded: SignInDataResponse | undefined = props.at
        ? jwtDecode(props.at)
        : undefined;
    useEffect(() => {
        if (!decoded) {
            if (typeof window !== 'undefined') {
                localStorage.clear();
            }
            router.push('/');
        }
    }, [decoded]);
    const toProfile = () => {
        router.push('/profile');
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="py-0 pl-0 h-12 hover:bg-transparent gap-0"
                >
                    <div className="bg-linear-to-r from-[#324460] to-[#69698D] flex items-center justify-center p-2 rounded-sm h-12 w-12 mr-3">
                        <DiamondIcon className="size-8" />
                    </div>
                    <div className="text-left">
                        <p className="text-neutral-600 font-semibold line-clamp-1">
                            {decoded?.first_name}&nbsp;{decoded?.last_name}
                        </p>
                        <p className="text-neutral-400 font-medium text-sm line-clamp-1">
                            {decoded?.point}&nbsp;pts
                        </p>
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-full max-w-[364px] p-6"
                align="end"
            >
                <DropdownMenuGroup>
                    <DropdownMenuItem
                        className="items-start p-3 hover:cursor-pointer mb-2"
                        onClick={toProfile}
                    >
                        <DropdownMenuShortcut className="ml-0">
                            <UserCurvedIcon className="size-6 text-yellow-100" />
                        </DropdownMenuShortcut>
                        <div className="flex flex-col gap-2">
                            <p className="text-base text-neutral-600 font-semibold">
                                Profile
                            </p>
                            <p className="text-sm text-neutral-400">
                                See all information including Account, Profile,
                                and Address.
                            </p>
                        </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="items-center justify-between p-3 hover:cursor-pointer bg-neutral-100"
                        onClick={signOut}
                    >
                        <p className="text-base text-neutral-500 font-semibold">
                            Logout
                        </p>
                        <ArrowRight className="text-neutral-500 size-[14px] stroke-2" />
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
