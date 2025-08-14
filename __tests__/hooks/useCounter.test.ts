import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useCounter from '../../hooks/useCounter';

describe('useCounter Hook', () => {
    it('should initialize with the initial value, clamped by min and max', () => {
        // Initial value within bounds
        let { result } = renderHook(() => useCounter(5, 0, 10));
        expect(result.current.value).toBe(5);

        // Initial value less than min
        ({ result } = renderHook(() => useCounter(-5, 0, 10)));
        expect(result.current.value).toBe(0);

        // Initial value greater than max
        ({ result } = renderHook(() => useCounter(15, 0, 10)));
        expect(result.current.value).toBe(10);

        // Initial value with no max
        ({ result } = renderHook(() => useCounter(5, 0)));
        expect(result.current.value).toBe(5);

        // Initial value less than min with no max
        ({ result } = renderHook(() => useCounter(-5, 0)));
        expect(result.current.value).toBe(0);
    });

    it('should increment the counter', () => {
        const { result } = renderHook(() => useCounter(0, 0, 5));
        act(() => {
            result.current.increment();
        });
        expect(result.current.value).toBe(1);
    });

    it('should not increment beyond maxValue', () => {
        const { result } = renderHook(() => useCounter(5, 0, 5));
        act(() => {
            result.current.increment();
        });
        expect(result.current.value).toBe(5); // Should remain at max
    });

    it('should decrement the counter', () => {
        const { result } = renderHook(() => useCounter(5, 0, 10));
        act(() => {
            result.current.decrement();
        });
        expect(result.current.value).toBe(4);
    });

    it('should not decrement below minValue', () => {
        const { result } = renderHook(() => useCounter(0, 0, 5));
        act(() => {
            result.current.decrement();
        });
        expect(result.current.value).toBe(0); // Should remain at min
    });

    it('should set the counter to a specific value, clamped by min and max', () => {
        const { result } = renderHook(() => useCounter(5, 0, 10));

        act(() => {
            result.current.setCounter(7);
        });
        expect(result.current.value).toBe(7);

        act(() => {
            result.current.setCounter(-1); // Below min
        });
        expect(result.current.value).toBe(0);

        act(() => {
            result.current.setCounter(15); // Above max
        });
        expect(result.current.value).toBe(10);
    });

    it('should reset the counter to its initial value', () => {
        const { result } = renderHook(() => useCounter(5, 0, 10));
        act(() => {
            result.current.increment();
            result.current.increment();
        });
        expect(result.current.value).toBe(7);

        act(() => {
            result.current.reset();
        });
        expect(result.current.value).toBe(5);
    });

    it('should correctly determine if decrement is disabled', () => {
        const { result } = renderHook(() => useCounter(0, 0, 5));
        expect(result.current.isDecrementDisabled).toBe(true);

        act(() => {
            result.current.increment();
        });
        expect(result.current.value).toBe(1);
        expect(result.current.isDecrementDisabled).toBe(false);
    });

    it('should correctly determine if increment is disabled', () => {
        const { result } = renderHook(() => useCounter(5, 0, 5));
        expect(result.current.isIncrementDisabled).toBe(true);

        act(() => {
            result.current.decrement();
        });
        expect(result.current.value).toBe(4);
        expect(result.current.isIncrementDisabled).toBe(false);
    });

    it('should handle undefined maxValue correctly', () => {
        const { result } = renderHook(() => useCounter(0, 0)); // No maxValue
        expect(result.current.isIncrementDisabled).toBe(false);

        act(() => {
            result.current.increment();
            result.current.increment();
            result.current.increment();
        });
        expect(result.current.value).toBe(3);
        expect(result.current.isIncrementDisabled).toBe(false); // Should never be disabled without maxValue
    });

    it('should handle NaN maxValue correctly', () => {
        const { result } = renderHook(() => useCounter(0, 0, NaN)); // NaN maxValue
        expect(result.current.isIncrementDisabled).toBe(false);

        act(() => {
            result.current.increment();
        });
        expect(result.current.value).toBe(1);
        expect(result.current.isIncrementDisabled).toBe(false);
    });
});
