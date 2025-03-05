export interface ITnCListItem {
    id: number
    title: string
    path?: string
}
export const tncList: ITnCListItem[] = [
    {
        title: "Privacy Policy",
        path: "/privacy-policy"
    },
    {
        title: "Layanan Online (Umum)",
        path: "/term-and-conditions"
    },
    {
        title: "Pesan Antar",
        path: "/term-and-conditions/hmd"
    },
    {
        title: "Bayar dan Ambil",
        path: "/term-and-conditions/pay-n-pick"
    },
    {
        title: "Drive Thru",
        path: "/term-and-conditions/drive-thru"
    },
    {
        title: "Layanan Antar Ke Meja",
        path: "/term-and-conditions/table-service"
    },
    {
        title: "Program Loyalitas dan Keanggotaan",
        // path: "/term-and-conditions/loyalty-and-rewards"
    },
    {
        title: "Promosi and Hadiah",
        // path: "/term-and-conditions/loyalty-and-rewards"
    },
    {
        title: "Pre-Booking Catering",
        // path: "/term-and-conditions/catering"
    },
    {
        title: "Pre-Booking Pesta Ulang Tahun",
    },
    {
        title: "Chaki Kids Club",
        // path: "/term-and-conditions/chaki-kids-club"
    },
].map((tnc, index) => ({ ...tnc, id: index + 1 }));