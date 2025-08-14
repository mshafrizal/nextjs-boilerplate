import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import useThousandSeparator from '../../hooks/useThousandSeparator';

describe('useThousandSeparator', () => {
    it('should format numbers with thousand separators', () => {
        const { result } = renderHook(() => useThousandSeparator());

        // Test with the example from the issue description
        expect(result.current.formatNumber(16150)).toBe('16.150');

        // Test with other examples
        expect(result.current.formatNumber(1000000)).toBe('1.000.000');
        expect(result.current.formatNumber(123)).toBe('123');
        expect(result.current.formatNumber(1234)).toBe('1.234');
    });

    it('should handle negative numbers', () => {
        const { result } = renderHook(() => useThousandSeparator());

        expect(result.current.formatNumber(-16150)).toBe('-16.150');
        expect(result.current.formatNumber(-1000000)).toBe('-1.000.000');
    });

    it('should handle decimal numbers', () => {
        const { result } = renderHook(() => useThousandSeparator());

        expect(result.current.formatNumber(1234.56)).toBe('1.234,56');
        expect(result.current.formatNumber(0.123)).toBe('0,123');
        expect(result.current.formatNumber(-1234.56)).toBe('-1.234,56');
    });

    it('should handle edge cases', () => {
        const { result } = renderHook(() => useThousandSeparator());

        // Test with zero
        expect(result.current.formatNumber(0)).toBe('0');

        // Test with invalid input
        expect(result.current.formatNumber(NaN)).toBe('0');
    });
});
