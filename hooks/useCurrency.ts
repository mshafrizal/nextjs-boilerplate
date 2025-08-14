import { useState, useEffect, useCallback } from 'react';
import { CURRENCY_CONFIG } from '@/lib/utils';
import { CurrencyCode } from '@/lib/common';

export default function useCurrency(defaultCurrency: CurrencyCode = 'IDR') {
    const [currency, setCurrency] = useState<CurrencyCode>(defaultCurrency);

    const getCurrencyFromLocalStorage = useCallback(() => {
        return localStorage.getItem('currency') ?? defaultCurrency;
    }, [defaultCurrency]);

    const saveCurrencyToLocalStorage = useCallback(
        (currencyCode: CurrencyCode) => {
            localStorage.setItem('currency', currencyCode);
            // Dispatch custom event to simulate storage change
            window.dispatchEvent(new CustomEvent('currencyChange'));
        },
        []
    );

    // Initialize currency from storage
    useEffect(() => {
        const savedCurrency = getCurrencyFromLocalStorage();
        if (savedCurrency && CURRENCY_CONFIG[savedCurrency as CurrencyCode]) {
            setCurrency(savedCurrency as CurrencyCode);
        }
    }, [getCurrencyFromLocalStorage]);

    // Listen for currency changes
    useEffect(() => {
        const handleStorageChange = () => {
            const newCurrency = getCurrencyFromLocalStorage();
            if (newCurrency && CURRENCY_CONFIG[newCurrency as CurrencyCode]) {
                setCurrency(newCurrency as CurrencyCode);
            }
        };

        window.addEventListener('currencyChange', handleStorageChange);
        return () =>
            window.removeEventListener('currencyChange', handleStorageChange);
    }, [getCurrencyFromLocalStorage]);

    // Format price with currency
    const formatPrice = useCallback(
        (price: number, currencyCode?: CurrencyCode): string => {
            const targetCurrency = currencyCode ?? currency;
            const config = CURRENCY_CONFIG[targetCurrency];
            const formattedNumber = new Intl.NumberFormat('en-US').format(
                price
            );

            return config.position === 'before'
                ? `${config.symbol}${formattedNumber}`
                : `${formattedNumber} ${config.symbol}`;
        },
        [currency]
    );

    // Change currency
    const changeCurrency = useCallback(
        (newCurrency: CurrencyCode) => {
            setCurrency(newCurrency);
            saveCurrencyToLocalStorage(newCurrency);
        },
        [saveCurrencyToLocalStorage]
    );

    // Calculate discount percentage
    const calculateDiscount = useCallback(
        (originalPrice: number, discountedPrice: number): number => {
            return Math.round(
                ((originalPrice - discountedPrice) / originalPrice) * 100
            );
        },
        []
    );

    return {
        currency,
        formatPrice,
        changeCurrency,
        calculateDiscount,
        availableCurrencies: Object.keys(CURRENCY_CONFIG) as CurrencyCode[],
        currencyConfig: CURRENCY_CONFIG,
    };
}
