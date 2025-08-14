// Mock the utility functions and icons
import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
    Button,
    buttonBaseStyles,
    buttonVariantOptions,
    buttonSizeOptions,
} from '@/components/ui/button';

vi.mock('@/lib/utils', () => ({
    cn: (...classes: any[]) => classes.filter(Boolean).join(' '),
}));

describe('Button', () => {
    test('Should have correct default css classes', () => {
        render(<Button data-testid="button">Button</Button>);

        // Use the exported configurations to build the expected class string
        const defaultClass = `${buttonBaseStyles} ${buttonVariantOptions.default} ${buttonSizeOptions.default}`;

        const btn = screen.getByTestId('button');
        expect(btn).toBeDefined();
        expect(btn.getAttribute('class')).toContain(defaultClass);
    });

    test('Should apply variant and size classes correctly', () => {
        render(
            <Button data-testid="outline-button" variant="outline" size="sm">
                Outline Button
            </Button>
        );

        // Use the exported configurations to build the expected class string
        const outlineSmClass = `${buttonBaseStyles} ${buttonVariantOptions.outline} ${buttonSizeOptions.sm}`;

        const btn = screen.getByTestId('outline-button');
        expect(btn).toBeDefined();
        expect(btn.getAttribute('class')).toContain(outlineSmClass);
    });
});
