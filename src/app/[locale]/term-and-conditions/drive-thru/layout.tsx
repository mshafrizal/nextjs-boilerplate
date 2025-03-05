import MainPage from "@/components/layout/main/page"
import { getLocale } from "next-intl/server"
import Link from "next/link"

export default async function TnCDetailLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    const locale = await getLocale()
    return (
        <div>
            <section className="breadcrumb">
              <Link href={`/${locale}/term-and-conditions/hmd`}>Term & Conditions</Link>
              <p className="breadcrumb-separator">/</p>
              <Link href={`/${locale}/term-and-conditions/drive-thru`} className="disabled">Drive Thru Service</Link>
            </section>
            <MainPage>{children}</MainPage>
        </div>
    )
  }