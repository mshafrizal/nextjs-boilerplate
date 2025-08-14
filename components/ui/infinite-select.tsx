'use client';

import * as React from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import useDebounce from '@/hooks/useDebounce';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';

export interface SelectOption {
    value: string;
    label: string;
    itemLabel?: string;
}

interface PaginatedResponse {
    data: unknown[];
    hasNextPage: boolean;
    nextPage?: number;
    totalCount?: number;
}

interface InfiniteSelectProps {
    placeholder?: string;
    value?: string;
    onValueChange?: (value: string) => void;
    fetchData: (page: number, search?: string) => Promise<PaginatedResponse>;
    transformData: (item: unknown) => SelectOption;
    searchable?: boolean;
    searchPlaceholder?: string;
    className?: string;
    disabled?: boolean;
    testId?: string;
    required?: boolean;
}

const MemoizedSelectItem = React.memo(
    ({ option }: { option: SelectOption }) => (
        <SelectItem key={option.value} value={option.value}>
            {option.itemLabel ?? option.label}
        </SelectItem>
    )
);

MemoizedSelectItem.displayName = 'MemoizedSelectItem';

export function InfiniteSelect({
    placeholder = 'Select an option...',
    value,
    onValueChange,
    fetchData,
    transformData,
    searchable = false,
    className,
    disabled = false,
    searchPlaceholder = 'Search...',
    testId = 'infinite-select',
    required,
}: Readonly<InfiniteSelectProps>) {
    const [options, setOptions] = React.useState<SelectOption[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [hasNextPage, setHasNextPage] = React.useState(true);
    const [currentPage, setCurrentPage] = React.useState(1);
    // Replace the existing searchTerm state and handleSearch logic
    const [searchInput, setSearchInput] = React.useState('');
    const debouncedSearchTerm = useDebounce(searchInput, 300);

    const scrollRef = React.useRef<HTMLDivElement>(null);
    const loadingRef = React.useRef(false);

    // Load initial data
    // Remove the existing handleSearch useMemo and replace the useEffect with:
    useEffect(() => {
        setOptions([]);
        setCurrentPage(1);
        setHasNextPage(true);
        loadData(1, true);
    }, [debouncedSearchTerm]);

    const loadData = async (page: number, reset = false) => {
        if (loadingRef.current) return;

        loadingRef.current = true;
        setLoading(true);

        try {
            // In the loadData function, replace searchTerm with debouncedSearchTerm:
            const response = await fetchData(
                page,
                debouncedSearchTerm || undefined
            );
            const newOptions = response.data.map(transformData);

            setOptions((prev) =>
                reset ? newOptions : [...prev, ...newOptions]
            );
            setHasNextPage(response.hasNextPage);
            setCurrentPage(page);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        } finally {
            setLoading(false);
            loadingRef.current = false;
        }
    };

    const handleScroll = React.useCallback(
        (e: React.UIEvent<HTMLDivElement>) => {
            const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;

            // Load more when scrolled to bottom (with 10px threshold)
            if (
                scrollHeight - scrollTop <= clientHeight + 10 &&
                hasNextPage &&
                !loading
            ) {
                loadData(currentPage + 1);
            }
        },
        [hasNextPage, loading, currentPage]
    );

    const handleOpenChange = (open: boolean) => {
        if (open && options.length === 0) {
            loadData(1, true);
        }
    };
    const renderValue = () => {
        const target = options.find((opt) => opt.value === value);
        if (!target)
            return (
                <span className="text-base duration-300 bg-white dark:bg-gray-900 text-neutral-300 dark:text-neutral-300 start-1">
                    {placeholder}{' '}
                    {required && <span className="text-red-500"> *</span>}
                </span>
            );

        return (
            <div>
                {target.label}
                <span className="absolute text-base duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 text-brand-01 dark:text-brand-01 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                    {placeholder} {required && <span> *</span>}
                </span>
            </div>
        );
    };

    return (
        <Select
            value={value}
            onValueChange={onValueChange}
            onOpenChange={handleOpenChange}
            disabled={disabled}
            data-testid={testId}
        >
            <SelectTrigger
                className={cn('relative focus-visible:ring-0', className)}
            >
                {renderValue()}
            </SelectTrigger>
            <SelectContent>
                <div
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className={`max-h-[200px] overflow-y-auto relative ${searchable ? 'pt-10' : ''}`}
                >
                    {searchable && (
                        <div className="p-2 border-b fixed top-0 w-full bg-white z-10">
                            <input
                                type="text"
                                placeholder={searchPlaceholder}
                                value={searchInput}
                                className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => setSearchInput(e.target.value)}
                            />
                        </div>
                    )}

                    {options.map((option) => (
                        <MemoizedSelectItem
                            key={option.value}
                            option={option}
                        />
                    ))}

                    {loading && (
                        <div className="flex items-center justify-center p-4">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span className="ml-2 text-sm text-muted-foreground">
                                Loading...
                            </span>
                        </div>
                    )}

                    {options.length === 0 && !loading && (
                        <div className="p-4 text-center text-sm text-muted-foreground">
                            No options found
                        </div>
                    )}
                </div>
            </SelectContent>
        </Select>
    );
}
