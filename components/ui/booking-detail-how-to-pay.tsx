'use client';

import { useTranslations } from 'next-intl';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from './accordion';

export default function BookingDetailHowToPay() {
    const t = useTranslations('BookingDetail');
    return (
        <section
            id="booking-detail-how-to-pay"
            data-testid="booking-detail-how-to-pay"
            className="shadow-sm rounded-sm p-4 bg-white"
        >
            <h2 className="text-lg text-neutral-600 font-semibold pb-4 border-b border-neutral-200">
                {t('howToPay')}
            </h2>

            <Accordion
                type="single"
                collapsible
                className="w-full"
                defaultValue="myBCA"
            >
                <AccordionItem value="myBCA">
                    <AccordionTrigger className="hover:no-underline text-neutral-600 font-semibold">
                        myBCA
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance text-neutral-400">
                        <ol className="ml-5">
                            <li className="list-decimal">
                                Login to the MyBCA app using your registered
                                account.
                            </li>
                            <li className="list-decimal">
                                Tap on the Transfer menu from the home screen.
                            </li>
                            <li className="list-decimal">
                                Select Virtual Account BCA as the transfer
                                method.
                            </li>
                            <li className="list-decimal">
                                Enter the Virtual Account number shown on the
                                payment page.
                            </li>
                            <li className="list-decimal">
                                Review the Payment Detailss and ensure
                                everything is correct.
                            </li>
                            <li className="list-decimal">
                                Confirm and complete the transaction.
                            </li>
                            <li className="list-decimal">
                                Once successful, a payment confirmation will
                                appear in the app.
                            </li>
                        </ol>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="bcaMobile">
                    <AccordionTrigger className="hover:no-underline text-neutral-600 font-semibold">
                        BCA Mobile
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance text-neutral-400">
                        <ol className="ml-5">
                            <li className="list-decimal">
                                Login to the BCA Mobile app using your
                                registered account.
                            </li>
                            <li className="list-decimal">
                                Tap on the Transfer menu from the home screen.
                            </li>
                            <li className="list-decimal">
                                Select Virtual Account BCA as the transfer
                                method.
                            </li>
                            <li className="list-decimal">
                                Enter the Virtual Account number shown on the
                                payment page.
                            </li>
                            <li className="list-decimal">
                                Review the Payment Detailss and ensure
                                everything is correct.
                            </li>
                            <li className="list-decimal">
                                Confirm and complete the transaction.
                            </li>
                            <li className="list-decimal">
                                Once successful, a payment confirmation will
                                appear in the app.
                            </li>
                        </ol>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="klikBCA">
                    <AccordionTrigger className="hover:no-underline text-neutral-600 font-semibold">
                        Klik BCA
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance text-neutral-400">
                        <ol className="ml-5">
                            <li className="list-decimal">
                                Login to the Klik BCA app using your registered
                                account.
                            </li>
                            <li className="list-decimal">
                                Tap on the Transfer menu from the home screen.
                            </li>
                            <li className="list-decimal">
                                Select Virtual Account BCA as the transfer
                                method.
                            </li>
                            <li className="list-decimal">
                                Enter the Virtual Account number shown on the
                                payment page.
                            </li>
                            <li className="list-decimal">
                                Review the Payment Detailss and ensure
                                everything is correct.
                            </li>
                            <li className="list-decimal">
                                Confirm and complete the transaction.
                            </li>
                            <li className="list-decimal">
                                Once successful, a payment confirmation will
                                appear in the app.
                            </li>
                        </ol>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="atmBCA">
                    <AccordionTrigger className="hover:no-underline text-neutral-600 font-semibold">
                        ATM BCA
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance text-neutral-400">
                        <ol className="ml-5">
                            <li className="list-decimal">
                                Login to the ATM BCA app using your registered
                                account.
                            </li>
                            <li className="list-decimal">
                                Tap on the Transfer menu from the home screen.
                            </li>
                            <li className="list-decimal">
                                Select Virtual Account BCA as the transfer
                                method.
                            </li>
                            <li className="list-decimal">
                                Enter the Virtual Account number shown on the
                                payment page.
                            </li>
                            <li className="list-decimal">
                                Review the Payment Detailss and ensure
                                everything is correct.
                            </li>
                            <li className="list-decimal">
                                Confirm and complete the transaction.
                            </li>
                            <li className="list-decimal">
                                Once successful, a payment confirmation will
                                appear in the app.
                            </li>
                        </ol>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </section>
    );
}
