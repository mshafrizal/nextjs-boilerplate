import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
    id: string;
    email: string;
    name: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    login: (token: string, refreshToken: string, user: User) => void;
    logout: () => void;
    setUser: (user: User) => void;
    refreshAccessToken: () => Promise<string | null>;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            refreshToken: null,
            isAuthenticated: false,
            login: (token, refreshToken, user) =>
                set({ token, refreshToken, user, isAuthenticated: true }),
            logout: () =>
                set({
                    token: null,
                    refreshToken: null,
                    user: null,
                    isAuthenticated: false,
                }),
            setUser: (user) => set({ user }),
            refreshAccessToken: async () => {
                const refreshToken = get().refreshToken;
                if (!refreshToken) return null;

                try {
                    const response = await fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}/v1/app/membership/refresh-token`,
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                refresh_token: refreshToken,
                            }),
                        }
                    );

                    if (!response.ok) {
                        // If refresh token is invalid, log the user out
                        get().logout();
                        return null;
                    }

                    const data = await response.json();
                    const newToken = data.response_output.detail.access_token;
                    const newRefreshToken =
                        data.response_output.detail.refresh_token;

                    // Update tokens in store
                    set({ token: newToken, refreshToken: newRefreshToken });

                    return newToken;
                } catch (error) {
                    console.error('Error refreshing token:', error);
                    return null;
                }
            },
        }),
        {
            name: 'auth-storage',
        }
    )
);
