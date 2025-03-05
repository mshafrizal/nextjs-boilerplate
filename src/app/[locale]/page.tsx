import MainPage from "@/components/layout/main/page";
import Image from "next/image";

export default function Page() {
    return (
        <MainPage>
            <div className="tnc-hint">
                <Image src={"/assets/icon/info-circle.svg"} width={24} height={24} alt="info icon" className="tnc-hint-icon" />
                <p className="tnc-hint-text">Pilih menu di samping untuk menampilkan syarat dan ketentuan </p>
            </div>
        </MainPage>
    )
}