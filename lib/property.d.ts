export interface Property {
    id: string;
    property_name: string;
    property_code: string;
    permissions: string[];
    property_pms_code: string;
    property_order: number;
    property_image_thumbnail: string;
    property_image_logo: string;
    property_check_in_time: string;
    property_check_out_time: string;
    property_booking_confirmation_recipients: string[];
    property_ecommerce_recipients: string[];
    property_rating: number;
    property_description_id: string;
    property_description_en: string;
    property_description: PropertyDescription[];
    property_country_id: string;
    property_city_id: any;
    property_location: string;
    property_address: string;
    property_email: string;
    property_website: string;
    property_map_url: string;
    property_timezone: PropertyTimezone;
    property_postal_code: string;
    property_country_phone_id: string;
    property_phone: string;
    property_country_whatsapp_id: string;
    property_whatsapp: string;
    property_country_fax_id: string;
    property_fax: string;
    property_facebook: string;
    property_instagram: string;
    property_twitter: string;
    property_youtube: string;
    is_active: boolean;
    idr_threshold: number;
    usd_threshold: number;
    property_maximum_los: number;
    created_at: string;
    updated_at: string;
    property_country_phone: PropertyCountryPhone;
    property_country_whatsapp: PropertyCountryWhatsapp;
    property_country_fax: PropertyCountryFax;
    property_country: PropertyCountry;
    property_city: any;
    property_channel: PropertyChannel;
    order_setting: OrderSetting;
}

export interface PropertyDescription {
    lang: string;
    content: string;
}

export interface PropertyTimezone {
    label: string;
    offset: number;
}

export interface PropertyCountryPhone {
    id: string;
    country_code: string;
    country_dial_code: string;
    country_name: string;
    created_at: string;
    updated_at: string;
}

export interface PropertyCountryWhatsapp {
    id: string;
    country_code: string;
    country_dial_code: string;
    country_name: string;
    created_at: string;
    updated_at: string;
}

export interface PropertyCountryFax {
    id: string;
    country_code: string;
    country_dial_code: string;
    country_name: string;
    created_at: string;
    updated_at: string;
}

export interface PropertyCountry {
    id: string;
    country_code: string;
    country_dial_code: string;
    country_name: string;
    created_at: string;
    updated_at: string;
}

export interface PropertyChannel {
    id: string;
    property_id: string;
    channel_id: string;
    service_code: string;
    key: string;
    va_partner_id: any;
    va_channel_id: any;
    va_service_id: any;
    created_at: string;
    updated_at: string;
}

export interface OrderSetting {
    id: string;
    booking_setting_max_room: number;
    booking_setting_max_stay: number;
    age_infant_from: number;
    age_infant_to: number;
    age_children_from: number;
    age_children_to: number;
    cancellation_time: string;
    conversion_usd_idr: string;
    conversion_aud_idr: string;
    conversion_jpy_idr: string;
    conversion_eur_idr: string;
    conversion_krw_idr: string;
    conversion_gbp_idr: string;
    tax: string;
    service_charge: string;
    created_at: string;
    updated_at: string;
    deleted_at: any;
    created_by: any;
    updated_by: any;
    deleted_by: any;
}
