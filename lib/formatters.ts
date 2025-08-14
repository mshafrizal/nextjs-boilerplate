/**
 * Formats a number to Indonesian Rupiah currency format.
 *
 * @param {number} number - The number to be formatted.
 * @param {string | undefined} separator - The separator to be displayed
 * @returns {string} A string representing the number in Rupiah format.
 *
 * @example
 * formatNumberToRupiah(1000000) // Returns "Rp1.000.000"
 */
export function formatNumberToRupiah(
    number: number,
    separator?: string
): string {
    // Check if the input number is valid
    if (isNaN(number) || number === null || !isFinite(number)) {
        return 'Rp 0'; // Return default value for invalid input
    }

    // Handle negative numbers
    const isNegative = number < 0;
    const absoluteNumber = Math.abs(number);

    // Convert the absolute number to an integer to remove the decimal part
    let integerPart = Math.floor(absoluteNumber).toString();

    // Reverse the integer part to ease the insertion of dots
    integerPart = integerPart.split('').reverse().join('');

    // Add dots every 3 digits
    let formatted = '';
    for (let i = 0; i < integerPart.length; i++) {
        if (i % 3 === 0 && i !== 0) {
            formatted += separator ?? '.';
        }
        formatted += integerPart[i];
    }

    // Reverse back the formatted integer part
    formatted = formatted.split('').reverse().join('');

    // Add the prefix "Rp" and the negative sign if needed
    return 'Rp ' + (isNegative ? '-' : '') + formatted;
}

export function formatNumberToRupiahNoPrefix(number: number): string {
    return String(formatNumberToRupiah(number)).replace('Rp', '');
}

export function formatNumberWithPrefix(
    number: number,
    prefix: string,
    separator?: string
): string {
    return String(formatNumberToRupiah(number, separator)).replace(
        'Rp',
        prefix
    );
}

export const formatDateForDisplay = (date?: Date) => {
    return (
        date?.toLocaleDateString('id', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
        }) ?? ''
    );
};

export function maskEmail(email: string): string {
    if (!email || typeof email !== 'string' || !email.includes('@')) {
        return email;
    }

    // Split email into local part (before @) and domain part (after @), limit to 2 parts
    const parts = email.split('@', 2);
    if (parts.length !== 2) {
        return email; // malformed email with multiple '@'
    }
    const [localPart, domainPart] = parts;

    // Check if both parts exist
    if (!localPart || !domainPart) {
        return email; // Return original if malformed
    }

    // If local part is empty or has only 1 character, return as is
    if (localPart.length <= 1) {
        return email;
    }

    // Mask local part
    const maskedLocalPart = `${localPart[0]}${localPart
        .split('')
        .slice(1)
        .map(() => '*')
        .join('')}`;

    return `${maskedLocalPart}@${domainPart}`;
}

export function formatMobileNumber(phoneNumber: string): string {
    if (!phoneNumber) {
        return '';
    }
    const trimmed = phoneNumber.trim();
    // only allow digits and +
    const validCharacters = /^[\d+]*$/;
    if (!validCharacters.test(trimmed)) {
        return phoneNumber; // Display as is
    }
    // remove + symbols
    const digitsOnly = trimmed.replace(/\+/g, '');
    if (digitsOnly.length === 0) {
        return '';
    }
    return digitsOnly.replace(/(\d{4})/g, '$1 - ').replace(/ - $/, '');
}

export function formatBookingDate(
    startDate: string,
    endDate: string,
    locale: string = 'en'
) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const validatedLocale = ['en', 'id'].includes(locale) ? locale : 'en';

    const months: { en: string[]; id: string[] } = {
        en: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ],
        id: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'Mei',
            'Jun',
            'Jul',
            'Agu',
            'Sep',
            'Okt',
            'Nov',
            'Des',
        ],
    };

    const startDay = start.getDate();
    const startMonth =
        months[validatedLocale as keyof typeof months][start.getMonth()];
    const startYear = start.getFullYear();

    const endDay = end.getDate();
    const endMonth =
        months[validatedLocale as keyof typeof months][end.getMonth()];
    const endYear = end.getFullYear();

    // Same month and year
    if (startMonth === endMonth && startYear === endYear) {
        return `${startDay} - ${endDay} ${startMonth} ${startYear}`;
    }

    // Different months, same year
    if (startYear === endYear) {
        return `${startDay} ${startMonth} - ${endDay} ${endMonth} ${startYear}`;
    }

    // Different years
    return `${startDay} ${startMonth} ${startYear} - ${endDay} ${endMonth} ${endYear}`;
}
