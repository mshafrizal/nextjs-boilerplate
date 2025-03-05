"use client";

import React, { useEffect, useState } from 'react'

import { useTranslations } from "next-intl";
import { useParams } from 'next/navigation';
import { Box, Skeleton, Typography } from '@mui/material';
import { Content } from '@/common';

function PrivacyPolicy() {

	const t = useTranslations("Privacy");
  	const params = useParams();
  	const locale = params?.locale || "en-id"; // Fallback locale

	const [htmlContent, setHtmlContent] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(true);
	
  	useEffect(() => {
    	const fetchHTML = async () => {
      		try {
        		const res = await fetch(t("path"));
        		if (!res.ok) throw new Error("Failed to load privacy policy");
        		const json: Content = await res.json();
				const body = locale === 'en-id' ? json.response_output.detail.body_en : json.response_output.detail.body_id
        		setHtmlContent(body);
			} catch (error) {
				console.error("Error fetching privacy policy:", error);
			} finally {
				setLoading(false)
			}
    	};

    	fetchHTML();
  	}, [locale]);

  	return (
    	<Box className='tnc-value'>
			{loading && <Box width={"100%"} height={500} display={"flex"} flexDirection={"column"} gap={2}>
				<Skeleton variant="text" animation="pulse" width={"50%"} height={24}></Skeleton>
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

export default PrivacyPolicy