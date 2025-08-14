import PadmaLogo from '@/components/ui/padma-logo';
import LocaleSwitcher from '@/components/ui/locale-switcher';
import { useMemo } from 'react';

interface ReservationStepperItem {
    label: string;
    isActive: boolean;
}

export default function PadmaHeaderReservation() {
    const steps: ReservationStepperItem[] = useMemo(() => {
        return [
            {
                label: 'Hotel',
                isActive: false,
            },
            {
                label: 'Room',
                isActive: false,
            },
            {
                label: 'Book',
                isActive: true,
            },
            {
                label: 'Payment',
                isActive: false,
            },
        ];
    }, []);
    return (
        <header className="shadow-sm bg-white">
            <div className="container flex justify-between mx-auto px-4 py-5">
                <div className="flex gap-10">
                    <PadmaLogo />
                    <ul className="hidden md:flex gap-4">
                        {steps.map((step, index) => (
                            <ReservationStepper
                                step={step}
                                showSeparator={index > 0}
                                index={index}
                                currentStep={2}
                                key={step.label}
                            />
                        ))}
                    </ul>
                </div>
                <LocaleSwitcher />
            </div>
        </header>
    );
}

interface ReservationStepperProps {
    step: ReservationStepperItem;
    showSeparator: boolean;
    index: number;
    currentStep: number;
}

function ReservationStepper(props: Readonly<ReservationStepperProps>) {
    return (
        <li className="flex items-center gap-4">
            {props.showSeparator && (
                <hr
                    className={`w-4 border-2 rounded-full ${props.currentStep < props.index ? 'border-neutral-300' : 'border-brand-01 '}`}
                />
            )}
            <div
                className={`w-7 h-7 ${props.step.isActive ? 'bg-yellow-00 text-brand-01 border border-brand-01' : 'bg-brand-01 text-white'} ${props.currentStep < props.index ? 'bg-neutral-300! text-white' : ''} flex items-center justify-center text-center rounded-full text-sm`}
            >
                {props.index + 1}
            </div>
            <p
                className={`${props.currentStep > props.index ? 'font-medium' : 'font-normal'} text-neutral-500 text-xs`}
            >
                {props.step.label}
            </p>
        </li>
    );
}
