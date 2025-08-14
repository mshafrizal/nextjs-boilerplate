'use client';

import { Province } from '@/lib/common';
import LocationSelect from './location-select';

interface ComboboxProps {
    onChange: (provinceId: string) => void;
    onBlur: () => void;
    value: string;
    country: string;
}

export default function ProvinceSelect(props: Readonly<ComboboxProps>) {
    return (
        <LocationSelect<Province>
            onChange={props.onChange}
            onBlur={props.onBlur}
            value={props.value}
            dependsOn={props.country}
            required
            dependsOnParam="country_id"
            apiEndpoint="province"
            displayProperty="province_name"
            placeholder="Province"
            searchPlaceholder="Search province..."
            loadingText="Loading provinces..."
            emptyText="No province found."
            dependsOnEmptyText="Please select a country first."
            data-testid="province-select"
        />
    );
}
