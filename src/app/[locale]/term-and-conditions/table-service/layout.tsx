import MainPage from "@/components/layout/main/page"
import Link from "next/link"

export default function TnCDetailLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <div>
            <section className="breadcrumb">
              <Link href={"/term-and-conditions"}>Term & Conditions</Link>
              <p className="breadcrumb-separator">/</p>
              <Link href={"/term-and-conditions/table-service"} className="disabled">Table Service</Link>
            </section>
            <MainPage>{children}</MainPage>
        </div>
    )
  }