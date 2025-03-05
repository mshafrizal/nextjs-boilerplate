// "use client";

import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {ReactNode} from 'react';
// import Navigation from '@/components/Navigation';

import Header from "@/components/layout/header/page";

// import '@/styles/global.scss';
import '@/styles/layout/__layout.scss'
import Footer from "@/components/layout/footer/page";
import { Box } from "@mui/material";
import localFont from 'next/font/local'

type Props = {
	children: ReactNode;
	locale: string;
};

const National2CondensedFont = localFont({
	src: '../../../public/assets/fonts/National2Condensed-Bold.otf',
	display: 'swap',
  })

export default async function Layout({children, locale}: Props) {
  	// Providing all messages to the client
  	const messages = await getMessages();

  	return (
    	<html lang={locale} className={National2CondensedFont.className}>
      		<body>
        		<NextIntlClientProvider messages={messages}>
					<Box className='layout-container'>
						<Header />
						{children}
						<Footer />
					</Box>
        		</NextIntlClientProvider>
      		</body>
    	</html>
  	);
}