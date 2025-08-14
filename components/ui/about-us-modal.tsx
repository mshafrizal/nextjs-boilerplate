'use client';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import sanitizeHtml from 'sanitize-html';
import { memo, useEffect, useState } from 'react';
import { ActionResponse } from '@/lib/common';
import { getContent } from '@/lib/SettingContentActions';
import { useModalStore } from '@/store/modal';
import { ScrollArea } from '@/components/ui/scroll-area';
import { LoaderCircle } from 'lucide-react';
import { sanitizeHTMLConfig } from '@/lib/utils';

const STORAGE_KEY = 'about-us';
const MemoizedDialogHeader = memo(() => (
    <DialogHeader className={'hidden'} title={'About Padma Hotels'}>
        <DialogTitle>About Padma Hotels</DialogTitle>
    </DialogHeader>
));
export default function AboutUsModal() {
    const { isModalAboutUsOpen, toggleModalAboutUs } = useModalStore();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [content, setContent] = useState<string>('');
    useEffect(() => {
        const cachedContent =
            typeof window !== 'undefined'
                ? sessionStorage.getItem(STORAGE_KEY)
                : null;
        if (cachedContent) setContent(cachedContent);
        else {
            setIsLoading(true);
            getContent('about-us')
                .then((res) => {
                    const actionRes = res as unknown as ActionResponse<string>;
                    const sanitizedContent = sanitizeHtml(
                        actionRes.result,
                        sanitizeHTMLConfig
                    );
                    setContent(sanitizedContent);
                    if (typeof window !== 'undefined') {
                        sessionStorage.setItem(STORAGE_KEY, sanitizedContent);
                    }
                })
                .catch((error) => {
                    console.error('Failed to load about us content:', error);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, []);
    MemoizedDialogHeader.displayName = 'MemoizedDialogHeader';
    return (
        <Dialog
            open={isModalAboutUsOpen}
            onOpenChange={() => {
                toggleModalAboutUs();
            }}
        >
            {isLoading ? (
                <DialogContent
                    onEscapeKeyDown={(e) => e.preventDefault()}
                    onPointerDownOutside={(e) => e.preventDefault()}
                    onInteractOutside={(e) => e.preventDefault()}
                >
                    <MemoizedDialogHeader />
                    <div className={'h-54 w-full flex items-center'}>
                        <LoaderCircle
                            size={48}
                            className={'animate-spin mx-auto text-brand-01'}
                        />
                    </div>
                </DialogContent>
            ) : (
                <DialogContent
                    onEscapeKeyDown={(e) => e.preventDefault()}
                    onPointerDownOutside={(e) => e.preventDefault()}
                    onInteractOutside={(e) => e.preventDefault()}
                >
                    <MemoizedDialogHeader />
                    <ScrollArea style={{ height: '70vh' }}>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: content,
                            }}
                            className={'setting-content'}
                        ></div>
                    </ScrollArea>
                </DialogContent>
            )}
        </Dialog>
    );
}
