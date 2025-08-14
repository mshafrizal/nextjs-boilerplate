import jwt from 'jsonwebtoken';

export interface DecodedToken {
    userId: string;
    email: string;
    exp: number;
    iat: number;
}

export const decodeToken = (token: string): DecodedToken | null => {
    try {
        return jwt.decode(token) as DecodedToken;
    } catch {
        return null;
    }
};

export const isTokenExpired = (token: string): boolean => {
    const decoded = decodeToken(token);
    if (!decoded) return true;

    const now = Date.now() / 1000;
    return decoded.exp < now;
};

export const getTokenFromStorage = (): string | null => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('auth-storage');
    }
    return null;
};
