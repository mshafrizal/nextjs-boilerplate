import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';
import { signOut } from '@/lib/AuthActions';
import { getTranslations } from 'next-intl/server';
import { SignInDataResponse } from '@/lib/common';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from '@/i18n/navigation';
import MyBookingContent from '@/components/ui/my-booking-content';

export default async function MyBookingPage({
    searchParams,
}: Readonly<{
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}>) {
    const cookieStore = await cookies();
    const at = cookieStore.get('at');
    const decoded: SignInDataResponse | undefined = at?.value
        ? jwtDecode(at.value)
        : undefined;
    if (!decoded) {
        await signOut();
    }
    const t = await getTranslations('MyBooking');
    const tab = (await searchParams).tab as string | undefined;
    return (
        <div
            className="container px-6 2xl:px-0 mx-auto"
            data-testid="my-booking-page"
        >
            <div className={'max-w-[1120px] rounded-sm mx-auto my-10'}>
                <h1 className="h1 mb-2" data-testid="page-title">
                    {t('title')}
                </h1>
                <p
                    className="text-neutral-500 mb-6 lg:max-w-1/2"
                    data-testid="page-desc"
                >
                    {t('desc')}
                </p>
                <div className="flex flex-col bg-white">
                    <Tabs
                        defaultValue={tab ?? 'upcoming'}
                        className="w-full bg-white rounded-sm"
                    >
                        <TabsList>
                            <TabsTrigger
                                value="upcoming"
                                className="cursor-pointer px-0 sm:px-0 py-0"
                                data-testid="upcoming-tab-trigger"
                            >
                                <Link
                                    href={`/my-booking?tab=upcoming`}
                                    className="px-3 sm:px-6 py-3"
                                >
                                    {t('upcoming')}
                                </Link>
                            </TabsTrigger>
                            <TabsTrigger
                                value="history"
                                className="cursor-pointer px-0 sm:px-0 py-0"
                                data-testid="history-tab-trigger"
                            >
                                <Link
                                    href={`/my-booking?tab=history`}
                                    className="px-3 sm:px-6 py-3"
                                >
                                    {t('history')}
                                </Link>
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent
                            value="upcoming"
                            className="py-4"
                            data-testid="upcoming-tab-content"
                        >
                            <MyBookingContent
                                isOnGoing={true}
                                sectionId="upcoming-item"
                                testId="upcoming-content-item"
                                token={at?.value}
                            />
                        </TabsContent>
                        <TabsContent
                            value="history"
                            className="py-4"
                            data-testid="history-tab-content"
                        >
                            <MyBookingContent
                                isOnGoing={false}
                                sectionId="history-item"
                                testId="history-content-item"
                                token={at?.value}
                            />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
