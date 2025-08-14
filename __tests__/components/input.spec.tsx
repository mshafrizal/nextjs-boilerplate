/**
 * @vitest-environment jsdom
 */
import { expect, vi, test, describe } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { Input, PasswordInput, LabeledInput } from '@/components/ui/input';

// Mock the utility functions and icons
vi.mock('@/lib/utils', () => ({
    cn: (...classes: any[]) => classes.filter(Boolean).join(' '),
}));

vi.mock('@/components/icons/eye-hidden-icon', () => ({
    default: ({ className, onClick }: any) => (
        <div
            className={className}
            onClick={onClick}
            data-testid="eye-hidden-icon"
            role="button"
        >
            EyeHidden
        </div>
    ),
}));

vi.mock('@/components/icons/eye-open-icon', () => ({
    default: ({ className, onClick }: any) => (
        <div
            className={className}
            onClick={onClick}
            data-testid="eye-open-icon"
            role="button"
        >
            EyeOpen
        </div>
    ),
}));

describe('Input', () => {
    test('Input component', () => {
        render(<Input data-testid="input" />);
        const input = within(screen.getByTestId('input'));
        expect(input).toBeDefined();
    });

    test('Labeled Input component', () => {
        render(<LabeledInput label="Input" id="Input" />);
        expect(screen.getByLabelText('Input')).toBeDefined();
    });

    test('Password Input component', () => {
        render(
            <PasswordInput
                label="Password"
                id="password"
                data-testid="password"
            />
        );
        const input = screen.getByTestId('password');
        const type = input.getAttribute('type');
        expect(type).toBe('password');
    });

    test('Password Input toggle type', () => {
        render(
            <PasswordInput
                label="Password"
                id="password"
                data-testid="password"
            />
        );
        const input = screen.getByTestId('password');
        expect(screen.getByTestId('eye-hidden-icon')).toBeDefined();
        fireEvent.click(screen.getByTestId('eye-hidden-icon'));
        expect(screen.getByTestId('eye-open-icon')).toBeDefined();
        expect(input.getAttribute('type')).eql('text');
    });
});
