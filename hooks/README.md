# Hooks

This directory contains custom React hooks used throughout the application.

## useThousandSeparator

A hook that provides a function to format numbers with thousand separators using periods (`.`).

### Usage

```tsx
import useThousandSeparator from '@/hooks/useThousandSeparator';

function MyComponent() {
    const { formatNumber } = useThousandSeparator();

    // Format a number with thousand separators
    const formattedNumber = formatNumber(16150); // Returns "16.150"

    return (
        <div>
            <p>Original number: 16150</p>
            <p>Formatted number: {formattedNumber}</p>
        </div>
    );
}
```

### Examples

```tsx
// Basic usage
formatNumber(16150); // Returns "16.150"
formatNumber(1000000); // Returns "1.000.000"

// Handling negative numbers
formatNumber(-16150); // Returns "-16.150"

// Handling decimal numbers
formatNumber(1234.56); // Returns "1.234,56"
```

### Edge Cases

- Zero: `formatNumber(0)` returns `"0"`
- NaN or null: `formatNumber(NaN)` returns `"0"`

### Implementation Details

The hook uses a callback function to format numbers with thousand separators. It:

1. Handles negative numbers by preserving the negative sign
2. Splits the number into integer and decimal parts
3. Formats the integer part with thousand separators (periods)
4. Uses commas for decimal separators
5. Returns the formatted string

For a complete example, see the `ThousandSeparatorExample` component in the `components/examples` directory.
