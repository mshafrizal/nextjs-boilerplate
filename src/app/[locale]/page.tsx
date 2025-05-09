import Image from "next/image";
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
export default async function Page() {
    const l = await getLocale();
    const getMenus = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cms/tnc-contents-sidebar`,
    );
    const res = await getMenus.json();
    const menus = res.data as TncSidebar[];
    return (
        <Container className={"tnc-container"} maxWidth={"xl"}>
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
                                                // selected={selectedItem?.id === item.id}
                                                // disabled={!Boolean(item?.path)}
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
                                            // sx={{
                                            //   backgroundColor:
                                            //     selectedItem?.id === item.id
                                            //       ? "#E4002B"
                                            //       : "#D0D5DD",
                                            //   border:
                                            //     selectedItem?.id === item.id
                                            //       ? "1px solid #E4002B"
                                            //       : "1px solid #D0D5DD",
                                            // }}
                                            />
                                        </Link>
                                    </Box>
                                ))}
                            </List>
                        </div>

                        <Box className={"details-tnc"}>
                            <div className="tnc-hint">
                                <Image
                                    src={"/assets/icon/info-circle.svg"}
                                    width={24}
                                    height={24}
                                    alt="info icon"
                                    className="tnc-hint-icon"
                                />
                                <p className="tnc-hint-text">
                                    Pilih menu di samping untuk menampilkan
                                    syarat dan ketentuan{" "}
                                </p>
                            </div>
                        </Box>
                    </div>
                </div>
            </Card>
        </Container>
    );
}
