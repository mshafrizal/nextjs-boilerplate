import { useCallback } from 'react';

/**
 * A hook that provides a function to format numbers with thousand separators.
 *
 * @returns An object containing the formatNumber function.
 *
 * @example
 * const { formatNumber } = useThousandSeparator();
 * formatNumber(16150); // Returns "16.150"
 */
export default function useThousandSeparator() {
    /**
     * Formats a number with thousand separators using periods.
     *
     * @param {number} value - The number to be formatted.
     * @returns {string} A string representing the number with thousand separators.
     *
     * @example
     * formatNumber(16150); // Returns "16.150"
     * formatNumber(1000000); // Returns "1.000.000"
     * formatNumber(-12345); // Returns "-12.345"
     * formatNumber(1234.56); // Returns "1.234,56"
     */
    const formatNumber = useCallback((value: number): string => {
        // Check if the input is valid
        if (isNaN(value) || value === null) {
            return '0';
        }

        // Handle negative numbers
        const isNegative = value < 0;
        const absValue = Math.abs(value);

        // Split the number into integer and decimal parts
        const [integerPart, decimalPart] = absValue.toString().split('.');

        // Format the integer part with thousand separators
        let formattedInteger = '';
        const reversedInteger = integerPart.split('').reverse().join('');

        for (let i = 0; i < reversedInteger.length; i++) {
            if (i > 0 && i % 3 === 0) {
                formattedInteger += '.';
            }
            formattedInteger += reversedInteger[i];
        }

        // Reverse back the formatted integer part
        formattedInteger = formattedInteger.split('').reverse().join('');

        // Combine the parts
        let result = isNegative ? '-' + formattedInteger : formattedInteger;

        // Add decimal part if exists
        if (decimalPart) {
            result += ',' + decimalPart;
        }

        return result;
    }, []);

    return { formatNumber };
}
