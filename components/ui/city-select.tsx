'use client';

import { City } from '@/lib/common';
import LocationSelect from './location-select';

interface ComboboxProps {
    onChange: (cityId: string) => void;
    onBlur: () => void;
    value: string;
    province: string;
}

export default function CitySelect(props: Readonly<ComboboxProps>) {
    return (
        <LocationSelect<City>
            onChange={props.onChange}
            onBlur={props.onBlur}
            value={props.value}
            dependsOn={props.province}
            dependsOnParam="province_id"
            apiEndpoint="city"
            displayProperty="city_name"
            placeholder="City"
            required
            searchPlaceholder="Search city..."
            loadingText="Loading cities..."
            emptyText="No city found."
            dependsOnEmptyText="Please select a province first."
        />
    );
}
