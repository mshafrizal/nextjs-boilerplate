'use client';

import * as React from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { cn, commonHeaders } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { APIResponse, DetailResponse, PaginatedResponse } from '@/lib/common';
import { useEffect, useState } from 'react';
import { CommandLoading } from 'cmdk';

// Generic interface for location items (Country, Province, City)
export interface LocationItem {
    id: string;
    [key: string]: any;
}

interface LocationSelectProps<T extends LocationItem> {
    onChange: (id: string) => void;
    value: string;
    dependsOn?: string; // Optional parent selection ID (e.g., country_id for province, province_id for city)
    apiEndpoint: string; // API endpoint path (e.g., 'country', 'province', 'city')
    dependsOnParam?: string; // Parameter name for the parent selection (e.g., 'country_id', 'province_id')
    displayProperty: string; // Property to display (e.g., 'country_name', 'province_name', 'city_name')
    placeholder: string; // Placeholder text (e.g., 'Select country...', 'Select province...', 'Select city...')
    searchPlaceholder: string; // Search placeholder text
    loadingText: string; // Loading text
    emptyText: string; // Text to show when no items are found
    dependsOnEmptyText?: string; // Text to show when dependsOn is required but not provided
    onBlur: () => void;
    required?: boolean;
    className?: string;
}

export default function LocationSelect<T extends LocationItem>({
    onChange,
    value,
    dependsOn,
    apiEndpoint,
    dependsOnParam,
    displayProperty,
    placeholder,
    searchPlaceholder,
    loadingText,
    emptyText,
    dependsOnEmptyText,
    onBlur,
    required,
    className,
}: Readonly<LocationSelectProps<T>>) {
    const [opts, setOpts] = useState<T[]>([]);
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState('');
    const [debouncedSearch, setDebouncedSearch] = React.useState('');
    const [loading, setLoading] = React.useState(true);
    const [selectedOpt, setSelectedOpt] = React.useState<T | null>(null);

    // Debounce search term
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 300); // 300ms delay

        return () => clearTimeout(timer);
    }, [search]);

    const fetchItems = async () => {
        try {
            setLoading(true);
            const params: Record<string, string> = {
                page: '1',
                limit: '20',
                search: debouncedSearch,
            };

            // Add dependsOn parameter if provided
            if (dependsOn && dependsOnParam) {
                params[dependsOnParam] = dependsOn;
            }

            const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/v1/app/${apiEndpoint}?${new URLSearchParams(params).toString()}`;

            const response = await fetch(apiUrl, {
                headers: commonHeaders,
            });

            const res = (await response.json()) as APIResponse<
                PaginatedResponse<T>
            >;
            setOpts(res.response_output.list.content);
        } catch (e) {
            console.log(`fetch ${apiEndpoint} failed`, e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Only fetch if there's no dependency or if the dependency is provided
        if (!dependsOn || (dependsOn && dependsOnParam)) {
            fetchItems();
        } else {
            setLoading(false);
            setOpts([]);
        }
    }, [debouncedSearch, dependsOn, dependsOnParam, apiEndpoint]);

    // Fetch the selected item when value changes
    useEffect(() => {
        if (value) {
            // First check if the item is already in the opts
            const item = opts.find((item) => item.id === value);
            if (item) {
                setSelectedOpt(item);
                return;
            }

            // If not, fetch it from the API
            const fetchSelectedItem = async () => {
                try {
                    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/v1/app/${apiEndpoint}/${value}`;

                    const response = await fetch(apiUrl, {
                        headers: {
                            'Content-Type': 'application/json',
                            'app-token': process.env
                                .NEXT_PUBLIC_APP_TOKEN as string,
                        },
                    });

                    const res = (await response.json()) as APIResponse<
                        DetailResponse<T>
                    >;
                    setSelectedOpt(res.response_output.detail);
                } catch (e) {
                    console.log(`fetch selected ${apiEndpoint} failed`, e);
                }
            };

            fetchSelectedItem();
        } else {
            setSelectedOpt(null);
        }
    }, [value, opts, apiEndpoint]);

    const onOpenChange = (open: boolean) => {
        if (!open) onBlur();
        setOpen(open);
    };

    return (
        <Popover open={open} onOpenChange={onOpenChange} modal={true}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                        'relative w-full items-center justify-between text-base text-neutral-500 border-neutral-300 font-normal h-12',
                        className
                    )}
                >
                    <span className="text-neutral-600">
                        {selectedOpt && selectedOpt[displayProperty]}
                    </span>
                    <span
                        className={`absolute text-base ${selectedOpt ? 'text-brand-01 px-2 dark:text-brand-01 scale-75 top-1 -translate-y-4 -translate-x-2 rtl:translate-x-1/4 rtl:left-auto bg-white' : 'text-neutral-300 dark:text-gray-400 top-3 z-10 origin-[0] dark:bg-gray-900 px-2 scale-100'} duration-300 transform start-1`}
                    >
                        {placeholder}
                        {required && (
                            <span
                                className={`${selectedOpt ? 'text-brand-01' : 'text-red-500'}`}
                            >
                                {' '}
                                *
                            </span>
                        )}
                    </span>
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
                <Command>
                    <CommandInput
                        placeholder={searchPlaceholder}
                        value={search}
                        onValueChange={setSearch}
                    />
                    <CommandList>
                        {loading ? (
                            <CommandLoading className={'p-2'}>
                                {loadingText}
                            </CommandLoading>
                        ) : dependsOnParam && !dependsOn ? (
                            <CommandEmpty>{dependsOnEmptyText}</CommandEmpty>
                        ) : opts.length === 0 ? (
                            <CommandEmpty>{emptyText}</CommandEmpty>
                        ) : (
                            <CommandGroup>
                                {opts.map((item) => (
                                    <CommandItem
                                        key={item.id}
                                        value={item[displayProperty]}
                                        onSelect={() => {
                                            onChange(item.id);
                                            setSelectedOpt(item);
                                            setOpen(false);
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                'mr-2 h-4 w-4',
                                                value === item.id
                                                    ? 'opacity-100'
                                                    : 'opacity-0'
                                            )}
                                        />
                                        {item[displayProperty]}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
