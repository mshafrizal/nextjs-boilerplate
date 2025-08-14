import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import sanitizeHtml from 'sanitize-html';
import { DateRange } from 'react-day-picker';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const sanitizeHTMLConfig = {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
    allowedAttributes: {
        h1: ['style'],
        h2: ['style'],
        h3: ['style'],
        h4: ['style'],
        h5: ['style'],
        h6: ['style'],
        p: ['style'],
        span: ['style'],
        table: ['style', 'border'],
        td: ['style'],
        img: ['src', 'alt', 'width', 'height'],
    },
    selfClosing: ['img', 'br'],
};

export const commonHeaders = {
    'Content-Type': 'application/json',
    'app-token': process.env.NEXT_PUBLIC_APP_TOKEN as string,
};

export const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,20}$/;

export const countNights = (dateRange?: DateRange): number => {
    if (!dateRange?.from || !dateRange?.to) {
        return 1;
    }

    // Calculate difference in milliseconds
    const timeDiff = dateRange.to.getTime() - dateRange.from.getTime();

    // Convert to days (nights)
    const nights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    return Math.max(1, nights);
};

export function parseDate(dateStr?: string | null) {
    if (!dateStr) return null;

    const parts = dateStr.split('/');
    if (parts.length !== 3) return null;

    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed in JS
    const year = parseInt(parts[2], 10);

    return new Date(year, month, day);
}

export const CURRENCY_CONFIG = {
    IDR: { symbol: 'Rp', position: 'before' },
    GBP: { symbol: '£', position: 'before' },
    SAR: { symbol: 'SR', position: 'after' },
    KRW: { symbol: '₩', position: 'before' },
    JPY: { symbol: '¥', position: 'before' },
    RMB: { symbol: '¥', position: 'before' }, // RMB/CNY
};
