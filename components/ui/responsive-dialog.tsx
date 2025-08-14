'use client';
import { useResponsive } from '@/hooks/useResponsive';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface ResponsiveCalendarProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    desktopChildren: ReactNode;
    mobileChildren: ReactNode;
    trigger: ReactNode;
    title?: string;
    description?: string;
    className?: string;
    showCloseButton?: boolean;
    onlyCloseFromButton?: boolean;
    ['data-testid']?: string;
}
export default function ResponsiveDialog({
    open,
    setOpen,
    desktopChildren,
    mobileChildren,
    trigger,
    title = '',
    description = '',
    className,
    showCloseButton = true,
    onlyCloseFromButton,
    ...rest
}: Readonly<ResponsiveCalendarProps>) {
    const { isDesktop, isLargeDesktop } = useResponsive();
    if (isDesktop || isLargeDesktop) {
        return (
            <Dialog
                open={open}
                onOpenChange={setOpen}
                data-testid={rest['data-testid']}
            >
                <DialogTrigger asChild>{trigger}</DialogTrigger>
                <DialogContent
                    className={cn('sm:max-w-425px', className)}
                    showCloseButton={showCloseButton}
                    onEscapeKeyDown={
                        onlyCloseFromButton
                            ? (e) => e.preventDefault()
                            : undefined
                    }
                    onPointerDownOutside={
                        onlyCloseFromButton
                            ? (e) => e.preventDefault()
                            : undefined
                    }
                    onInteractOutside={
                        onlyCloseFromButton
                            ? (e) => e.preventDefault()
                            : undefined
                    }
                >
                    <VisuallyHidden>
                        <DialogHeader>
                            <DialogTitle>{title}</DialogTitle>
                            <DialogDescription>{description}</DialogDescription>
                        </DialogHeader>
                    </VisuallyHidden>
                    {desktopChildren}
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer
            open={open}
            onOpenChange={setOpen}
            data-testid={rest['data-testid']}
        >
            <DrawerTrigger asChild>{trigger}</DrawerTrigger>
            <DrawerContent className="flex items-center">
                <VisuallyHidden>
                    <DrawerHeader>
                        <DrawerTitle>{title}</DrawerTitle>
                        <DrawerDescription>{description}</DrawerDescription>
                    </DrawerHeader>
                </VisuallyHidden>
                {mobileChildren}
            </DrawerContent>
        </Drawer>
    );
}
