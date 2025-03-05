"use client";

import { Box, Card, Divider, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import '@/styles/components/__tnc.scss';
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { ChevronRight } from "@mui/icons-material";
import { useEffect, useMemo, useState } from "react";

import { ITnCListItem, tncList } from "./menu-list/TncList";
import { useResponsive } from "@/hooks/useResponsive";
import Link from "next/link";

export default function MainPage({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const t = useTranslations('Tnc');
    const [selectedItem, setSelectedItem] = useState<ITnCListItem | undefined>();
    const breakpoints = useResponsive()

    useEffect(() => {
        const strippedPath = pathname.replace(/^\/[a-z]{2}-[a-z]{2}/, ''); // Removes /en-id or similar
        const currentItem = tncList.find(item => strippedPath === item.path)

        if (currentItem) {
            setSelectedItem(currentItem);
        }
        if (pathname.split("/").length < 3) setSelectedItem(undefined)
        
        if (typeof window !== undefined) window.scrollTo(0, 0)
    }, [pathname]);

    const handleListItemClick = (item: any) => {
        if (item.path) {
            setSelectedItem(item);
            router.push(item.path);
        }
    };
    
    const showTopicTitle = useMemo(() => {
        
        if ((!selectedItem && (breakpoints.isMobile || breakpoints.isTablet) && (pathname === '/en-id' || pathname === '/id-id'))) {
            return true
        }
        if (breakpoints.isDesktop || breakpoints.isLargeDesktop) return true
        return false
    }, [pathname, selectedItem, breakpoints])
    return (
        <div className="tnc-container">
            <Card className="tnc-card">
                <div className="tnc-content">
                    {showTopicTitle && <div className="topic-title">
                        Topics
                    </div>}
                    <div className="tnc-main-content">
                        {/* Left Side: List */}
                        {showTopicTitle && <div className="tnc-list">
                            <List component="nav">
                                {tncList.map((item) => (
                                    <Box key={item.id}>
                                        <Link href={item.path ?? "#"}>
                                        <ListItemButton className="list-button"
                                            selected={selectedItem?.id === item.id}
                                            disabled={!Boolean(item?.path)}
                                        >
                                                <ListItemText className="list-text" primary={t(item.title)} />
                                                <ListItemIcon className="list-icon">
                                                    <ChevronRight />
                                                </ListItemIcon>
                                        </ListItemButton>

                                        <Divider
                                            sx={{
                                                backgroundColor: selectedItem?.id === item.id ? '#E4002B' : '#D0D5DD',
                                                border: selectedItem?.id === item.id ? '1px solid #E4002B' : '1px solid #D0D5DD',
                                            }}
                                            />
                                            </Link>
                                    </Box>
                                ))}
                            </List>
                        </div>}

                        {/* Right Side: Details */}
                        <Box className='details-tnc'>
                            {children}
                        </Box>
                    </div>
                </div>
            </Card>
        </div>
    )
                        
}