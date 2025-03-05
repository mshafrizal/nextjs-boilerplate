import MainPage from "@/components/layout/main/page"
import { getLocale } from "next-intl/server"
import Link from "next/link"

export default async function PrivacyPolicyLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    const locale = await getLocale()
    return (
        <div>
            <section className="breadcrumb">
              <Link href={`/${locale}/privacy-policy`} className="disabled">Privacy Policy</Link>
            </section>
            <MainPage>{children}</MainPage>
        </div>
    )
  }