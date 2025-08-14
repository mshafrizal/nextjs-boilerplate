'use server';
import { verifyEmailToken } from '@/lib/AuthActions';

export default async function VerifyEmailPage({
    searchParams,
}: Readonly<{
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}>) {
    const token = (await searchParams).token as string;
    const type = (await searchParams).type as string;
    await verifyEmailToken({ token, type });
}
