import { Box, Skeleton } from "@mui/material";

export default function TncLoading() {
    return (
        <Box width={"100%"} height={500} display={"flex"} flexDirection={"column"} gap={2}>
            <Skeleton variant="text" animation="pulse" width={"50%"}></Skeleton>
            <Skeleton variant="rectangular" animation="pulse" width={"100%"} height={32}></Skeleton>
            <Skeleton variant="rectangular" animation="pulse" width={"100%"} height={400}></Skeleton>
        </Box>
    )
}