// JavaScript Unit Tests (using Vitest framework)
import { passwordRegex } from '@/lib/utils';
import { describe, test, expect } from 'vitest';

function validatePassword(password: any) {
    return passwordRegex.test(password);
}

describe('Password Validation Tests', () => {
    // Valid password tests
    describe('Valid Passwords', () => {
        const validPasswords = [
            'MyPass123!',
            'SecureP@ss1',
            'Hello123#',
            'Abcdef1$',
            'Test123456!',
            'Valid1@Password',
            'P@ssw0rd',
            'MyStr0ng!Pass',
            'Complex123#',
            'Good2Go!',
            'Super123$ecret',
            'Test1234@',
            'Aa1!bcde',
            'Strong123#Pass',
            '12345Aa!',
            'Minimum8!',
            'Maximum20Chars1!',
            'Special!@#123Aa',
            'Mixed123$Case',
            'Valid123&Test',
            '#Padma123*',
            '#Padma123!@#%%^&*()',
            '#Padma123$',
            'Password12#',
            'Password12^',
            'Password12*',
            'Padma3><:"|}{~#^()_+',
        ];

        validPasswords.forEach((password) => {
            test(`should validate "${password}" as valid`, () => {
                expect(validatePassword(password)).toBe(true);
            });
        });
    });

    // Invalid password tests - Missing requirements
    describe('Invalid Passwords - Missing Requirements', () => {
        test('should reject passwords without uppercase letters', () => {
            const passwords = ['lowercase123!', 'test123@', 'password1#'];
            passwords.forEach((password) => {
                expect(validatePassword(password)).toBe(false);
            });
        });

        test('should reject passwords without lowercase letters', () => {
            const passwords = ['UPPERCASE123!', 'TEST123@', 'PASSWORD1#'];
            passwords.forEach((password) => {
                expect(validatePassword(password)).toBe(false);
            });
        });

        test('should reject passwords without numbers', () => {
            const passwords = ['MyPassword!', 'TestPass@', 'NoNumbers#'];
            passwords.forEach((password) => {
                expect(validatePassword(password)).toBe(false);
            });
        });

        test('should reject passwords without special characters', () => {
            const passwords = ['MyPassword123', 'TestPass123', 'NoSpecial123'];
            passwords.forEach((password) => {
                expect(validatePassword(password)).toBe(false);
            });
        });
    });

    // Invalid password tests - Length requirements
    describe('Invalid Passwords - Length Requirements', () => {
        test('should reject passwords shorter than 8 characters', () => {
            const shortPasswords = ['Aa1!', 'Test1@', 'Ab1#', 'Short1!'];
            shortPasswords.forEach((password) => {
                expect(validatePassword(password)).toBe(false);
            });
        });

        test('should reject passwords longer than 20 characters', () => {
            const longPasswords = [
                'ThisPasswordIsTooLong123!',
                'VeryLongPassword123456!@#',
                'ExtremelyLongPassword1!@#$',
            ];
            longPasswords.forEach((password) => {
                expect(validatePassword(password)).toBe(false);
            });
        });
    });

    // Edge cases
    describe('Edge Cases', () => {
        test('should handle exactly 8 characters', () => {
            expect(validatePassword('Abcdef1!')).toBe(true);
        });

        test('should handle exactly 20 characters', () => {
            expect(validatePassword('Abcdefgh12345678!@#$')).toBe(true);
        });

        test('should reject empty string', () => {
            expect(validatePassword('')).toBe(false);
        });

        test('should reject null/undefined', () => {
            expect(validatePassword(null)).toBe(false);
            expect(validatePassword(undefined)).toBe(false);
        });

        test('should handle all types of special characters', () => {
            const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
            specialChars.split('').forEach((char) => {
                expect(validatePassword(`Test123${char}`)).toBe(true);
            });
        });
    });
});
