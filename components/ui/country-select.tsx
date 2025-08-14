'use client';

import { Country } from '@/lib/common';
import LocationSelect from './location-select';

interface ComboboxProps {
    onChange: (countryId: string) => void;
    onBlur: () => void;
    value: string;
    className?: string;
}

export default function CountrySelect(props: Readonly<ComboboxProps>) {
    return (
        <LocationSelect<Country>
            onChange={props.onChange}
            onBlur={props.onBlur}
            value={props.value}
            apiEndpoint="country"
            displayProperty="country_name"
            placeholder="Country"
            required
            searchPlaceholder="Search country..."
            loadingText="Loading countries..."
            emptyText="No country found."
            data-testid="country-select"
            className={props.className}
        />
    );
}
