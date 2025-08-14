import { useMemo, useState } from 'react';

export default function useCounter(
    initialValue: number,
    minValue: number,
    maxValue?: number
) {
    const clampedInitialValue = useMemo(() => {
        let clamped = Math.max(initialValue, minValue);
        if (maxValue !== undefined && !isNaN(maxValue)) {
            clamped = Math.min(clamped, maxValue);
        }
        return clamped;
    }, [initialValue, minValue, maxValue]);

    const [value, setValue] = useState<number>(clampedInitialValue);

    const setCounter = (newValue: number) => {
        let clamped = Math.max(newValue, minValue);
        if (maxValue !== undefined && !isNaN(maxValue)) {
            clamped = Math.min(clamped, maxValue);
        }
        setValue(clamped);
    };

    const increment = () => {
        setValue((prev) => {
            if (
                maxValue !== undefined &&
                !isNaN(maxValue) &&
                prev >= maxValue
            ) {
                return prev;
            }
            return prev + 1;
        });
    };

    const decrement = () => {
        setValue((prev) => {
            if (prev <= minValue) {
                return prev;
            }
            return prev - 1;
        });
    };

    const reset = () => setCounter(initialValue);

    const isDecrementDisabled = useMemo(
        () => value <= minValue,
        [value, minValue]
    );

    const isIncrementDisabled = useMemo(
        () =>
            maxValue !== undefined && !isNaN(maxValue)
                ? value >= maxValue
                : false,
        [value, maxValue]
    );

    return {
        value,
        setCounter,
        increment,
        decrement,
        reset,
        isDecrementDisabled,
        isIncrementDisabled,
    };
}
