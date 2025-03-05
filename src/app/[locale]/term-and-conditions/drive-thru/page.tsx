"use client";

import React, { useEffect, useState } from 'react'

import { useTranslations } from "next-intl";
import { useParams } from 'next/navigation';
import { Box, Skeleton, Typography } from '@mui/material';

function DriveThru() {
	const t = useTranslations("DriveThru");
  	const params = useParams();
  	const locale = params?.locale || "en-id";

	const [htmlContent, setHtmlContent] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(true)
  	
	useEffect(() => {
    	const fetchHTML = async () => {
      		try {
        		const res = await fetch(t("path"));
        		if (!res.ok) throw new Error("Failed to load DriveThru");
        		const text = await res.text();
        		setHtmlContent(text);
			} catch (error) {
				console.error("Error fetching DriveThru:", error);
			} finally {
				setLoading(false)
			}
    	};

    	fetchHTML();
  	}, [locale]);

  	return (
    	<Box className='tnc-value'>
			{loading && <Box width={"100%"} height={500} display={"flex"} flexDirection={"column"} gap={2}>
				<Skeleton variant="text" animation="pulse" width={"50%"}></Skeleton>
				<Skeleton variant="rectangular" animation="pulse" width={"100%"} height={32}></Skeleton>
				<Skeleton variant="rectangular" animation="pulse" width={"100%"} height={400}></Skeleton>
			</Box>}
      		<Box sx={{
				transition: "all ease 1s",
				opacity: loading ? 0 : 1
			}} dangerouslySetInnerHTML={{ __html: htmlContent }} />
    	</Box>
  	)
}

export default DriveThru