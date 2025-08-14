'use client';

import { useState, useEffect, useCallback } from 'react';
import { BookingHistory } from '@/lib/booking';
import { APIResponse, PaginatedResponse, ResponseSchema } from '@/lib/common';

interface useBookingHistoryOptions {
    limit?: number;
    isOnGoing?: boolean;
    token?: string;
}

interface useBookingHistoryReturn {
    bookings: BookingHistory[];
    loading: boolean;
    error: string | null;
    hasMore: boolean;
    loadMore: () => void;
    refresh: () => void;
    responseSchema?: ResponseSchema;
}

const useBookingHistory = ({
    limit = 10,
    isOnGoing = false,
    token,
}: useBookingHistoryOptions): useBookingHistoryReturn => {
    const [bookings, setBookings] = useState<BookingHistory[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [responseSchema, setResponseSchema] = useState<ResponseSchema>();

    const fetchBookings = useCallback(
        async (page: number, reset: boolean = false) => {
            if (loading) return;

            setLoading(true);
            setError(null);

            try {
                const url = `${process.env.NEXT_PUBLIC_API_URL}/v1/app/booking?page=${page}&limit=${limit}&is_on_going=${isOnGoing}`;

                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const apiResponse: APIResponse<
                    PaginatedResponse<BookingHistory>
                > = await response.json();

                // Store response schema for potential error handling or status checking
                setResponseSchema(apiResponse.response_schema);

                // Check if the API returned an error in the response schema
                if (
                    apiResponse.response_schema.response_code !==
                    'PADMA-LIST-BOOKING-200'
                ) {
                    throw new Error(
                        apiResponse.response_schema.response_message?.en ||
                            apiResponse.response_schema.response_message?.id ||
                            'API returned an error'
                    );
                }
                const { content, pagination } =
                    apiResponse.response_output.list;

                if (reset) {
                    setBookings(content);
                } else {
                    setBookings((prev) => [...prev, ...content]);
                }

                setHasMore(
                    pagination.page * pagination.rows_per_page <
                        pagination.total
                );
                setCurrentPage(page);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : 'An error occurred while fetching bookings'
                );
            } finally {
                setLoading(false);
            }
        },
        [limit, isOnGoing, token, loading]
    );

    const loadMore = useCallback(() => {
        if (!loading && hasMore) {
            fetchBookings(currentPage + 1);
        }
    }, [fetchBookings, currentPage, loading, hasMore]);

    const refresh = useCallback(() => {
        setCurrentPage(1);
        setHasMore(true);
        fetchBookings(1, true);
    }, [fetchBookings]);

    // Initial fetch
    useEffect(() => {
        if (token) {
            fetchBookings(1, true);
        }
    }, [token]);

    return {
        bookings,
        loading,
        error,
        hasMore,
        loadMore,
        refresh,
        responseSchema,
    };
};

export default useBookingHistory;
