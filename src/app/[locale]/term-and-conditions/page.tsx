"use client"
import MainPage from "@/components/layout/main/page";
import { Skeleton } from "@mui/material";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function OnlineServicesPage() {
	const locale = useLocale()
	const [loading, setLoading] = useState(true)
	const [body, setBody] = useState("")
	useEffect(() => {
		setLoading(true)
		fetch("https://api-core.kfcku.co.id/v1/common/public/tnc")
			.then((res) => res.json())
			.then((json) => {
				setBody(locale === 'en-id' ? json.response_output.detail.body_en : json.response_output.detail.body_id)
			})
			.catch(e => console.log("Error fetching term and conditions", e))
			.finally(() => setLoading(false))
	}, [locale])

	return (
        <div>
            <section className="breadcrumb">
              <Link href={"/term-and-conditions"}>Term & Conditions</Link>
              <p className="breadcrumb-separator">/</p>
              <Link href={"/term-and-conditions/table-service"} className="disabled">Table Service</Link>
            </section>
            <MainPage>
				<div className="tnc-value">
					{loading && (
						<div className="flex flex-col gap-3">
						<Skeleton variant="text" animation="pulse" width={"50%"} height={24}></Skeleton>
						<Skeleton variant="rectangular" animation="pulse" width={"100%"} height={32}></Skeleton>
						<Skeleton variant="rectangular" animation="pulse" width={"100%"} height={600}></Skeleton>
						</div>
					)}
					{!loading && <div dangerouslySetInnerHTML={{ __html: body }}></div>}
					
				</div>
			</MainPage>
        </div>
	)
}
