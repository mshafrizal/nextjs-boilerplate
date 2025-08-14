import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import AppStore from '@/app/app-store.png';
import GooglePlay from '@/app/google-play.png';
import Image from 'next/image';
export default function DownloadApp(
    props: Readonly<HTMLAttributes<HTMLDivElement>>
) {
    return (
        <footer
            {...props}
            className={cn('py-2 sm:py-[14px] bg-neutral-600', props.className)}
        >
            <div className="container px-6 2xl:px-0 flex items-center justify-center sm:justify-between mx-auto">
                <p className={'hidden sm:flex text-white'}>
                    Your Journey to Serenity Begins Here. Get the Padma App.
                </p>
                <div className={'flex items-center gap-3 '}>
                    <Image
                        src={AppStore}
                        alt="app-store"
                        width={127}
                        height={36}
                    />
                    <Image
                        src={GooglePlay}
                        alt="google-play"
                        width={127}
                        height={36}
                    />
                </div>
            </div>
        </footer>
    );
}
