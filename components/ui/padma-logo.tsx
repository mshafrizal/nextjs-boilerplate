import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import Logo from '@/app/logo-1.png';

export default function PadmaLogo() {
    return (
        <Link href="/" className="flex items-center">
            <Image src={Logo} alt={'Logo'} width={47} height={40} />
        </Link>
    );
}
