import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
    formatNumberToRupiah,
    formatNumberToRupiahNoPrefix,
    formatDateForDisplay,
    maskEmail,
    formatMobileNumber,
} from '@/lib/formatters';

describe('formatNumberToRupiah', () => {
    it('should format positive numbers correctly', () => {
        expect(formatNumberToRupiah(1000000)).toBe('Rp 1.000.000');
        expect(formatNumberToRupiah(500000)).toBe('Rp 500.000');
        expect(formatNumberToRupiah(1234567)).toBe('Rp 1.234.567');
        expect(formatNumberToRupiah(999)).toBe('Rp 999');
    });

    it('should format small numbers correctly', () => {
        expect(formatNumberToRupiah(0)).toBe('Rp 0');
        expect(formatNumberToRupiah(1)).toBe('Rp 1');
        expect(formatNumberToRupiah(99)).toBe('Rp 99');
        expect(formatNumberToRupiah(100)).toBe('Rp 100');
    });

    it('should format large numbers correctly', () => {
        expect(formatNumberToRupiah(1000000000)).toBe('Rp 1.000.000.000');
        expect(formatNumberToRupiah(1234567890)).toBe('Rp 1.234.567.890');
        expect(formatNumberToRupiah(999999999)).toBe('Rp 999.999.999');
    });

    it('should handle decimal numbers by flooring them', () => {
        expect(formatNumberToRupiah(1000000.99)).toBe('Rp 1.000.000');
        expect(formatNumberToRupiah(1234567.456)).toBe('Rp 1.234.567');
        expect(formatNumberToRupiah(999.99)).toBe('Rp 999');
        expect(formatNumberToRupiah(0.99)).toBe('Rp 0');
    });

    it('should handle negative numbers', () => {
        expect(formatNumberToRupiah(-1000000)).toBe('Rp -1.000.000');
        expect(formatNumberToRupiah(-500000)).toBe('Rp -500.000');
        expect(formatNumberToRupiah(-1)).toBe('Rp -1');
    });

    it('should handle invalid inputs', () => {
        expect(formatNumberToRupiah(NaN)).toBe('Rp 0');
        expect(formatNumberToRupiah(null as any)).toBe('Rp 0');
        expect(formatNumberToRupiah(undefined as any)).toBe('Rp 0');
    });

    it('should handle edge cases', () => {
        expect(formatNumberToRupiah(Infinity)).toBe('Rp 0');
        expect(formatNumberToRupiah(-Infinity)).toBe('Rp 0');
        expect(formatNumberToRupiah(Number.MAX_SAFE_INTEGER)).toContain('Rp');
        expect(formatNumberToRupiah(Number.MIN_SAFE_INTEGER)).toContain('Rp');
    });
});

describe('formatNumberToRupiahNoPrefix', () => {
    it('should format numbers without Rp prefix', () => {
        expect(formatNumberToRupiahNoPrefix(1000000)).toBe(' 1.000.000');
        expect(formatNumberToRupiahNoPrefix(500000)).toBe(' 500.000');
        expect(formatNumberToRupiahNoPrefix(1234567)).toBe(' 1.234.567');
        expect(formatNumberToRupiahNoPrefix(999)).toBe(' 999');
    });

    it('should handle small numbers without prefix', () => {
        expect(formatNumberToRupiahNoPrefix(0)).toBe(' 0');
        expect(formatNumberToRupiahNoPrefix(1)).toBe(' 1');
        expect(formatNumberToRupiahNoPrefix(99)).toBe(' 99');
    });

    it('should handle negative numbers without prefix', () => {
        expect(formatNumberToRupiahNoPrefix(-1000000)).toBe(' -1.000.000');
        expect(formatNumberToRupiahNoPrefix(-500000)).toBe(' -500.000');
    });

    it('should handle invalid inputs without prefix', () => {
        expect(formatNumberToRupiahNoPrefix(NaN)).toBe(' 0');
        expect(formatNumberToRupiahNoPrefix(null as any)).toBe(' 0');
        expect(formatNumberToRupiahNoPrefix(undefined as any)).toBe(' 0');
    });

    it('should handle decimal numbers without prefix', () => {
        expect(formatNumberToRupiahNoPrefix(1000000.99)).toBe(' 1.000.000');
        expect(formatNumberToRupiahNoPrefix(1234567.456)).toBe(' 1.234.567');
    });
});

describe('formatDateForDisplay', () => {
    // Mock the toLocaleDateString method to ensure consistent test results
    const mockToLocaleDateString = vi.fn();

    beforeEach(() => {
        mockToLocaleDateString.mockReset();
    });

    it('should format valid dates correctly', () => {
        const mockDate = new Date('2024-01-15');
        mockToLocaleDateString.mockReturnValue('01/15/2024');
        mockDate.toLocaleDateString = mockToLocaleDateString;

        const result = formatDateForDisplay(mockDate);

        expect(mockToLocaleDateString).toHaveBeenCalledWith('id', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
        });
        expect(result).toBe('01/15/2024');
    });

    it('should handle undefined date', () => {
        const result = formatDateForDisplay(undefined);
        expect(result).toBe('');
    });

    it('should handle null date', () => {
        const result = formatDateForDisplay(null as any);
        expect(result).toBe('');
    });

    it('should format different dates correctly', () => {
        const testCases = [
            { date: new Date('2024-12-25'), expected: '25/12/2024' },
            { date: new Date('2024-01-01'), expected: '01/01/2024' },
            { date: new Date('2024-06-15'), expected: '15/06/2024' },
        ];

        testCases.forEach(({ date, expected }) => {
            mockToLocaleDateString.mockReturnValue(expected);
            date.toLocaleDateString = mockToLocaleDateString;

            const result = formatDateForDisplay(date);

            expect(mockToLocaleDateString).toHaveBeenCalledWith('id', {
                month: '2-digit',
                day: '2-digit',
                year: 'numeric',
            });
            expect(result).toBe(expected);
        });
    });

    it('should handle edge case dates', () => {
        const leapYearDate = new Date('2024-02-29');
        mockToLocaleDateString.mockReturnValue('29/02/2024');
        leapYearDate.toLocaleDateString = mockToLocaleDateString;

        const result = formatDateForDisplay(leapYearDate);
        expect(result).toBe('29/02/2024');
    });

    // Test with real dates (without mocking) to ensure actual behavior
    it('should work with real dates in Indonesian locale', () => {
        const date = new Date('2024-01-15');
        const result = formatDateForDisplay(date);

        // The result should be a non-empty string when a valid date is provided
        expect(result).toBeTruthy();
        expect(typeof result).toBe('string');
        expect(result.length).toBeGreaterThan(0);
    });
});

// Additional integration tests
describe('Formatters Integration Tests', () => {
    it('should handle a complete workflow', () => {
        const amount = 1500000.75;
        const withPrefix = formatNumberToRupiah(amount);
        const withoutPrefix = formatNumberToRupiahNoPrefix(amount);

        expect(withPrefix).toBe('Rp 1.500.000');
        expect(withoutPrefix).toBe(' 1.500.000');
        expect(withPrefix.replace('Rp', '')).toBe(withoutPrefix);
    });

    it('should handle zero values consistently', () => {
        const withPrefix = formatNumberToRupiah(0);
        const withoutPrefix = formatNumberToRupiahNoPrefix(0);
        const date = formatDateForDisplay(undefined);

        expect(withPrefix).toBe('Rp 0');
        expect(withoutPrefix).toBe(' 0');
        expect(date).toBe('');
    });
});

describe('maskEmail function', () => {
    it('should mask normal email addresses correctly', () => {
        expect(maskEmail('muhammad.shafrizal@akarinti.tech')).toBe(
            'm*****************@akarinti.tech'
        );
        expect(maskEmail('john.doe@example.com')).toBe('j*******@example.com');
        expect(maskEmail('user@domain.org')).toBe('u***@domain.org');
    });

    it('should handle short local parts', () => {
        expect(maskEmail('a@example.com')).toBe('a@example.com'); // Single character, no masking
        expect(maskEmail('ab@example.com')).toBe('a*@example.com'); // Two characters
    });

    it('should handle invalid inputs gracefully', () => {
        expect(maskEmail('')).toBe(''); // Empty string
        expect(maskEmail('invalid-email')).toBe('invalid-email'); // No @ symbol
        expect(maskEmail('@domain.com')).toBe('@domain.com'); // Missing local part
        expect(maskEmail('user@')).toBe('user@'); // Missing domain part
        expect(maskEmail('user@@domain.com')).toBe('user@@domain.com'); // Return as is
    });

    it('should handle edge cases', () => {
        expect(maskEmail('a@b.c')).toBe('a@b.c'); // Minimal valid email
        expect(maskEmail('test@sub.domain.co.uk')).toBe(
            't***@sub.domain.co.uk'
        ); // Complex domain
        expect(maskEmail('user.name+tag@example.com')).toBe(
            'u************@example.com'
        ); // Complex local part
    });

    it('should handle non-string inputs', () => {
        expect(maskEmail(null as any)).toBe(null);
        expect(maskEmail(undefined as any)).toBe(undefined);
        expect(maskEmail(123 as any)).toBe(123);
    });

    it('should handle special characters in local part', () => {
        expect(maskEmail('user-name@example.com')).toBe(
            'u********@example.com'
        );
        expect(maskEmail('user_name@example.com')).toBe(
            'u********@example.com'
        );
        expect(maskEmail('user.name@example.com')).toBe(
            'u********@example.com'
        );
        expect(maskEmail('123user@example.com')).toBe('1******@example.com');
    });
});

// Unit tests for mobile numbers only
describe('formatMobileNumber function - Mobile Numbers', () => {
    // Indonesian
    it('should format Indonesian mobile numbers correctly', () => {
        expect(formatMobileNumber('+628123456789')).toBe('6281 - 2345 - 6789'); // Telkomsel
        expect(formatMobileNumber('+62811234567')).toBe('6281 - 1234 - 567'); // Telkomsel (short)
        expect(formatMobileNumber('+628521234567')).toBe('6285 - 2123 - 4567'); // Indosat
        expect(formatMobileNumber('+628961234567')).toBe('6289 - 6123 - 4567'); // Three
        expect(formatMobileNumber('08123456789')).toBe('0812 - 3456 - 789'); // Without country code
    });

    // US
    it('should format US mobile numbers correctly', () => {
        expect(formatMobileNumber('+15551234567')).toBe('1555 - 1234 - 567');
        expect(formatMobileNumber('+12125551234')).toBe('1212 - 5551 - 234');
        expect(formatMobileNumber('+13105551234')).toBe('1310 - 5551 - 234');
        expect(formatMobileNumber('+14155551234')).toBe('1415 - 5551 - 234');
    });

    // UK
    it('should format UK mobile numbers correctly', () => {
        expect(formatMobileNumber('+447712345678')).toBe('4477 - 1234 - 5678');
        expect(formatMobileNumber('+447891234567')).toBe('4478 - 9123 - 4567');
        expect(formatMobileNumber('+447501234567')).toBe('4475 - 0123 - 4567');
        expect(formatMobileNumber('+447911234567')).toBe('4479 - 1123 - 4567');
    });

    // Australian
    it('should format Australian mobile numbers correctly', () => {
        expect(formatMobileNumber('+61412345678')).toBe('6141 - 2345 - 678');
        expect(formatMobileNumber('+61455123456')).toBe('6145 - 5123 - 456');
        expect(formatMobileNumber('+61432123456')).toBe('6143 - 2123 - 456');
        expect(formatMobileNumber('+61487654321')).toBe('6148 - 7654 - 321');
    });

    // Chinese
    it('should format Chinese mobile numbers correctly', () => {
        expect(formatMobileNumber('+86138123456789')).toBe(
            '8613 - 8123 - 4567 - 89'
        ); // 14 digits
        expect(formatMobileNumber('+8613812345678')).toBe(
            '8613 - 8123 - 4567 - 8'
        ); // 13 digits
        expect(formatMobileNumber('+8615912345678')).toBe(
            '8615 - 9123 - 4567 - 8'
        ); // 13 digits
        expect(formatMobileNumber('+8618612345678')).toBe(
            '8618 - 6123 - 4567 - 8'
        ); // 13 digits
    });
});
