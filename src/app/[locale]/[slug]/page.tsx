import {
    Box,
    Card,
    Container,
    Divider,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import Link from "next/link";
import { ChevronRight } from "@mui/icons-material";
import { getLocale } from "next-intl/server";
import "@/styles/components/__tnc.scss";

export interface TncSidebar {
    id: number;
    slug: string;
    topic_id: string;
    topic_en: string;
    sort_order: number;
}
export default async function Page({
    params,
}: {
    params: Promise<{ slug: string; locale: string }>;
}) {
    const p = await params;
    const l = await getLocale();
    const getContent = await fetch(
        `http://localhost:8080/api/v1/cms/tnc-contents/${p.slug}`,
    );
    const resContent = await getContent.json();
    const content = resContent.data;
    const getMenus = await fetch(
        "http://localhost:8080/api/v1/cms/tnc-contents-sidebar",
    );
    const resMenus = await getMenus.json();
    const menus = resMenus.data as TncSidebar[];
    return (
        <Container className={"tnc-container detail"} maxWidth={"xl"}>
            <Card className={"tnc-card"}>
                <div className="tnc-content">
                    <div className="topic-title">Topics</div>
                    <div className="tnc-main-content">
                        <div className="tnc-list">
                            <List
                                component="nav"
                                sx={{
                                    border: "1px solid rgba(208, 213, 221, 1)",
                                    borderRadius: "8px",
                                    paddingY: 0,
                                }}
                            >
                                {menus.map((item: TncSidebar) => (
                                    <Box key={item.id}>
                                        <Link href={`/${l}/${item.slug}`}>
                                            <ListItemButton
                                                className="list-button"
                                                selected={p?.slug === item.slug}
                                            >
                                                <ListItemText className="list-text">
                                                    {l === "id-id"
                                                        ? item.topic_id
                                                        : item.topic_en}
                                                </ListItemText>
                                                <ListItemIcon className="list-icon">
                                                    <ChevronRight />
                                                </ListItemIcon>
                                            </ListItemButton>

                                            <Divider
                                                sx={{
                                                    backgroundColor:
                                                        p.slug === item.slug
                                                            ? "#E4002B"
                                                            : "#D0D5DD",
                                                    border:
                                                        p.slug === item.slug
                                                            ? "1px solid #E4002B"
                                                            : "1px solid #D0D5DD",
                                                }}
                                            />
                                        </Link>
                                    </Box>
                                ))}
                            </List>
                        </div>

                        <Box className={"details-tnc"}>
                            <div
                                className={"tnc-value"}
                                dangerouslySetInnerHTML={{
                                    __html:
                                        l === "id-id"
                                            ? content.content_id
                                            : content.content_en,
                                }}
                            ></div>
                        </Box>
                    </div>
                </div>
            </Card>
        </Container>
    );
}
