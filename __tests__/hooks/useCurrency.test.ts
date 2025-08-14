import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useCurrency from '../../hooks/useCurrency'; // Adjust import path as needed

// Mock window object for testing
const mockWindow = {
    memoryCurrency: 'IDR',
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
};

// Setup global mocks
beforeEach(() => {
    // Reset window mock
    (global as any).window = mockWindow;
    mockWindow.memoryCurrency = 'IDR';
    mockWindow.addEventListener.mockClear();
    mockWindow.removeEventListener.mockClear();
    mockWindow.dispatchEvent.mockClear();
});

afterEach(() => {
    vi.clearAllMocks();
});

describe('useCurrency Hook', () => {
    describe('Initialization', () => {
        it('should initialize with default currency (IDR)', () => {
            const { result } = renderHook(() => useCurrency());

            expect(result.current.currency).toBe('IDR');
        });

        it('should initialize with custom default currency', () => {
            const { result } = renderHook(() => useCurrency('GBP'));

            expect(result.current.currency).toBe('GBP');
        });

        it('should load currency from memory storage on mount', () => {
            mockWindow.memoryCurrency = 'JPY';

            const { result } = renderHook(() => useCurrency());

            expect(result.current.currency).toBe('JPY');
        });

        it('should fall back to default if stored currency is invalid', () => {
            mockWindow.memoryCurrency = 'INVALID';

            const { result } = renderHook(() => useCurrency());

            expect(result.current.currency).toBe('IDR');
        });
    });

    describe('Currency Management', () => {
        it('should change currency and save to memory', () => {
            const { result } = renderHook(() => useCurrency());

            act(() => {
                result.current.changeCurrency('GBP');
            });

            expect(result.current.currency).toBe('GBP');
            expect(mockWindow.memoryCurrency).toBe('GBP');
            expect(mockWindow.dispatchEvent).toHaveBeenCalledWith(
                expect.objectContaining({
                    type: 'currencyChange',
                })
            );
        });

        it('should return available currencies', () => {
            const { result } = renderHook(() => useCurrency());

            expect(result.current.availableCurrencies).toEqual([
                'IDR',
                'GBP',
                'SAR',
                'KRW',
                'JPY',
                'CNY',
            ]);
        });

        it('should provide currency config', () => {
            const { result } = renderHook(() => useCurrency());

            expect(result.current.currencyConfig).toEqual({
                IDR: { symbol: 'Rp', position: 'before' },
                GBP: { symbol: '£', position: 'before' },
                SAR: { symbol: 'SR', position: 'after' },
                KRW: { symbol: '₩', position: 'before' },
                JPY: { symbol: '¥', position: 'before' },
                CNY: { symbol: '¥', position: 'before' },
            });
        });
    });

    describe('Price Formatting', () => {
        it('should format IDR price correctly (symbol before)', () => {
            const { result } = renderHook(() => useCurrency());

            const formatted = result.current.formatPrice(1500000);

            expect(formatted).toBe('Rp1,500,000');
        });

        it('should format GBP price correctly (symbol before)', () => {
            const { result } = renderHook(() => useCurrency('GBP'));

            const formatted = result.current.formatPrice(1500);

            expect(formatted).toBe('£1,500');
        });

        it('should format SAR price correctly (symbol after)', () => {
            const { result } = renderHook(() => useCurrency('SAR'));

            const formatted = result.current.formatPrice(1500);

            expect(formatted).toBe('1,500 SR');
        });

        it('should format KRW price correctly (symbol before)', () => {
            const { result } = renderHook(() => useCurrency('KRW'));

            const formatted = result.current.formatPrice(1500000);

            expect(formatted).toBe('₩1,500,000');
        });

        it('should format JPY price correctly (symbol before)', () => {
            const { result } = renderHook(() => useCurrency('JPY'));

            const formatted = result.current.formatPrice(1500);

            expect(formatted).toBe('¥1,500');
        });

        it('should format CNY price correctly (symbol before)', () => {
            const { result } = renderHook(() => useCurrency('RMB'));

            const formatted = result.current.formatPrice(1500);

            expect(formatted).toBe('¥1,500');
        });

        it('should format price with specific currency override', () => {
            const { result } = renderHook(() => useCurrency('IDR'));

            const formatted = result.current.formatPrice(1500, 'GBP');

            expect(formatted).toBe('£1,500');
        });

        it('should handle large numbers with proper formatting', () => {
            const { result } = renderHook(() => useCurrency());

            const formatted = result.current.formatPrice(123456789);

            expect(formatted).toBe('Rp123,456,789');
        });

        it('should handle zero and negative numbers', () => {
            const { result } = renderHook(() => useCurrency());

            expect(result.current.formatPrice(0)).toBe('Rp0');
            expect(result.current.formatPrice(-1000)).toBe('Rp-1,000');
        });
    });

    describe('Discount Calculation', () => {
        it('should calculate discount percentage correctly', () => {
            const { result } = renderHook(() => useCurrency());

            const discount = result.current.calculateDiscount(1000, 800);

            expect(discount).toBe(20);
        });

        it('should handle 50% discount', () => {
            const { result } = renderHook(() => useCurrency());

            const discount = result.current.calculateDiscount(1000, 500);

            expect(discount).toBe(50);
        });

        it('should handle no discount', () => {
            const { result } = renderHook(() => useCurrency());

            const discount = result.current.calculateDiscount(1000, 1000);

            expect(discount).toBe(0);
        });

        it('should round discount percentage', () => {
            const { result } = renderHook(() => useCurrency());

            const discount = result.current.calculateDiscount(1000, 833.33);

            expect(discount).toBe(17); // 16.667% rounded to 17%
        });

        it('should handle edge cases', () => {
            const { result } = renderHook(() => useCurrency());

            // 100% discount
            expect(result.current.calculateDiscount(1000, 0)).toBe(100);

            // Very small discount
            expect(result.current.calculateDiscount(1000, 999)).toBe(0);
        });
    });

    describe('Event Listeners', () => {
        it('should add event listener on mount', () => {
            renderHook(() => useCurrency());

            expect(mockWindow.addEventListener).toHaveBeenCalledWith(
                'currencyChange',
                expect.any(Function)
            );
        });

        it('should remove event listener on unmount', () => {
            const { unmount } = renderHook(() => useCurrency());

            unmount();

            expect(mockWindow.removeEventListener).toHaveBeenCalledWith(
                'currencyChange',
                expect.any(Function)
            );
        });

        it('should respond to currency change events', () => {
            const { result } = renderHook(() => useCurrency());

            // Get the event handler that was registered
            const eventHandler = mockWindow.addEventListener.mock.calls[0][1];

            // Simulate currency change in memory
            mockWindow.memoryCurrency = 'GBP';

            act(() => {
                eventHandler();
            });

            expect(result.current.currency).toBe('GBP');
        });
    });

    describe('Memoization', () => {
        it('should memoize formatPrice function', () => {
            const { result, rerender } = renderHook(() => useCurrency());

            const formatPriceRef1 = result.current.formatPrice;

            rerender();

            const formatPriceRef2 = result.current.formatPrice;

            expect(formatPriceRef1).toBe(formatPriceRef2);
        });

        it('should update memoized function when currency changes', () => {
            const { result } = renderHook(() => useCurrency());

            const formatPriceRef1 = result.current.formatPrice;

            act(() => {
                result.current.changeCurrency('GBP');
            });

            const formatPriceRef2 = result.current.formatPrice;

            expect(formatPriceRef1).not.toBe(formatPriceRef2);
        });
    });
});
